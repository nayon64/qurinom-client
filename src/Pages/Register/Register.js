import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import googleImg from "../../Assets/google.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInWithProvider, createUser, updateUserProfile } =
    useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imgbb_API_KEY;
  console.log(imageHostKey);

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    signInWithProvider(googleProvider).then((result) => {
		const user = result.user;
		console.log(user)
      const createUser = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userUID: user.uid,
      };
		console.log(createUser);
		fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createUser),
    })
      .then((res) => res.json())
      .then((successData) => {
        if (successData.acknowledged) {
          console.log(successData);
          toast("Succefully LogIn");
        }
      });
    });
  };

  const handleUserCreate = (data) => {
    const image = data.img[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);

    //   fetch image file in imgbb
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData?.data?.display_url) {
          const imgUrl = imageData?.data?.display_url;
          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              console.log(user.uid);

              // update user name and imgurl
              updateUserProfile({ displayName: data.name, photoURL: imgUrl })
                .then(() => {
                  const createUser = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: imgUrl,
                    userUID: user.uid,
                  };

                  fetch("http://localhost:5000/user", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(createUser),
                  })
                    .then((res) => res.json())
                    .then((successData) => {
                      if (successData.acknowledged) {
						  console.log(successData);
						  reset()
                        toast("Succefully account crate");
                      }
                    });
                })
                .catch((err) => {
                  console.log(err);
                  toast(err.message);
                });
            })
            .catch((err) => {
              console.log(err);
              toast(err.message);
            });
        }
      });
  };

  return (
    <div className="flex justify-center ">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-8">
        <h1 className="text-center mt-5 text-2xl font-bold">
          Rgistration From
        </h1>
        <form onSubmit={handleSubmit(handleUserCreate)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="file"
              {...register("img")}
              className="file-input w-full max-w-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", { required: "Please enter your email" })}
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="password"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
          <p>
            Have an account?
            <Link className="font-semibold text-primary ml-1" to="/login">
              LogIn
            </Link>
          </p>
          <div className="divider text-secondary">OR</div>
          <div
            onClick={googleLogin}
            className="border-2 rounded-lg flex justify-center cursor-pointer items-center"
          >
            <img className="w-6 py-2" src={googleImg} alt="" />
            <span className="text-base ml-2 font-semibold">
              Log in with Google
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

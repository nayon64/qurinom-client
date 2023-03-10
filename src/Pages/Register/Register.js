import axios from "axios";
import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleImg from "../../Assets/google.png";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const { signInWithProvider, createUser, updateUserProfile } =
    useContext(AuthContext);

  // imageBB API key
  const imageHostKey = process.env.REACT_APP_imgbb_API_KEY;

  // provdier
  const googleProvider = new GoogleAuthProvider();

  // set JWT token in local storage
  const getJWTtoken = (email) => {
    axios
      .get(`https://qurinom-server.vercel.app/jwt?email=${email}`)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          toast.success("Succefully LogIn");
          navigate(from, { replace: true });
        }
      });
  };

  const googleLogin = () => {
    signInWithProvider(googleProvider).then((result) => {
      const user = result.user;
      console.log(user.email);
      const createUser = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userUID: user.uid,
      };
      console.log(createUser);
      fetch("https://qurinom-server.vercel.app/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(createUser),
      })
        .then((res) => res.json())
        .then((successData) => {
          if (successData.acknowledged) {
            getJWTtoken(user?.email);
          }
        });
    });
  };

  // create user with email and password
  const handleUserCreate = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);

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

              // update user name and imgurl
              updateUserProfile({ displayName: data.name, photoURL: imgUrl })
                .then(() => {
                  const createUser = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: imgUrl,
                    userUID: user.uid,
                  };

                  fetch("https://qurinom-server.vercel.app/user", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(createUser),
                  })
                    .then((res) => res.json())
                    .then((successData) => {
                      if (successData.acknowledged) {
                        const email = user.email;
                        getJWTtoken(email);
                        reset();
                      }
                    });
                })
                .catch((err) => {
                  toast(err.message);
                });
            })
            .catch((err) => {
              toast(err.message);
            });
        }
      });
  };

  return (
    <div className="flex justify-center w-screen ">
      <div className="card flex-shrink-0 w-full max-w-sm sm:max-w-2xl shadow-2xl bg-base-100 mt-8">
        <h1 className="text-center mt-5 text-2xl font-bold">
          Registration Form
        </h1>
        <form onSubmit={handleSubmit(handleUserCreate)} className="card-body">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                {...register("name", { required: "Please Enter Your Name" })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="text-rose-500 mt-1">{errors.name?.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Profile Image</span>
              </label>
              <input
                type="file"
                {...register("img", { required: "Please Select One Picture." })}
                className="file-input file-input-bordered w-full max-w-xs"
              />
              {errors.img && (
                <p className="text-rose-500 mt-1">{errors.img?.message}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
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
              {errors.email && (
                <p className="text-rose-500 mt-1">{errors.email?.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Please Enter a Passdword.",
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && (
                <p className="text-rose-500 mt-1">{errors.password?.message}</p>
              )}
            </div>
          </div>

          <div className="form-control mt-6">
            <input
              className="btn btn-primary max-w-lg mx-auto"
              type="submit"
              value="Register"
            />
          </div>
          <p className="text-center">
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

import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import googleImg from "../../Assets/google.png";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Login = () => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const { signInWithProvider, logIn } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();

  // google login function
  const googleLogin = () => {
    signInWithProvider(googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
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
            navigate(from, { replace: true });
          }
        });
    });
  };

  // user email and password login fuction
  const handleLogIn = (data) => {
    logIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        reset();
        toast.success("Successfully Login");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center ">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-8">
        <h1 className="text-center mt-5 text-2xl font-bold">LogIn From</h1>
        <form onSubmit={handleSubmit(handleLogIn)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Pleaser Enter Your Email." })}
              type="text"
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
              {...register("password", {
                required: "Pleaser Enter Your Password.",
              })}
              type="password"
              placeholder="password"
              className="input input-bordered"
            />
            {errors.password && (
              <p className="text-rose-500 mt-1">{errors.password?.message}</p>
            )}
          </div>
          <input className="btn btn-primary" type="submit" value="Login" />

          <p>
            Create an account?
            <Link className="font-semibold text-primary ml-1" to="/register">
              Register
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

export default Login;

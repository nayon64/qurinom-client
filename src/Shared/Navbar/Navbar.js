import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`${user?.uid ? "block" : "hidden"} sticky top-0 z-50`}>
      <div className="navbar bg-slate-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/myActivity">My Activity</Link>
              </li>
              <li>
                <button>
                  <Link
                    onClick={handleLogout}
                    className="bg-gray-600 px-3 py-2 rounded-lg text-white font-semibold mx-2  lg:hidden"
                  >
                    LogOut
                  </Link>
                </button>
              </li>
            </ul>
          </div>
          
          <Link to="/" className="w-48">
            <img
              src="https://qurinomsolutions.com/wp-content/uploads/2021/03/Group-11.png"
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg text-slate-700 font-semibold">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/myActivity">My Activity</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user?.uid && (
            <div className="flex items-center">
              <Link
                onClick={handleLogout}
                className="bg-slate-700 px-3 py-2 rounded-lg text-white font-semibold mx-2 hidden lg:block"
              >
                LogOut
              </Link>
              <div className="avatar ">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

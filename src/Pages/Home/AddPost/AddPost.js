import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { FcAddImage, FcCalendar, FcPicture, FcVideoCall } from "react-icons/fc";

const AddPost = ({ setModalOpen }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-lg mt-2 mx-3 p-4">
      <div className=" flex">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={user?.photoURL} alt="" />
          </div>
        </div>

        <a href="#add-post" className="w-full">
          <input
            onClick={() => setModalOpen(true)}
            type="text"
            readOnly
            placeholder="Start a post.."
            className="input input-ghost input-bordered w-full ml-2 hover:bg-gray-200 cursor-pointer"
          />
        </a>
      </div>
      <div className="flex justify-between mt-4 sm:mx-3">
        <div className="flex items-center ">
          <FcPicture className="mr-1 md:mr-3 text-2xl" />
          <span className="text-sm sm:text-base font-semibold text-gray-600">
            Photo
          </span>
        </div>
        <div className="flex items-center ">
          <FcVideoCall className="mr-1 md:mr-3 text-2xl" />
          <span className="text-sm sm:text-base font-semibold text-gray-600">
            Video
          </span>
        </div>
        <div className="flex items-center ">
          <FcCalendar className="mr-1 md:mr-3 text-2xl" />
          <span className="text-sm sm:text-base font-semibold text-gray-600">
            Event
          </span>
        </div>
        <div className="flex items-center ">
          <FcAddImage className="mr-1 md:mr-3 text-2xl" />
          <span className="text-sm sm:text-base font-semibold text-gray-600">
            Event Article
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import SmallLoading from "../SmallLoading/SmallLoading";

const EditPostModal = ({ post, setOpen }) => {
  const { register, reset, handleSubmit } = useForm();
  const { authAxios } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const submitPost = (data) => {
    console.log(data.post);
    const date = new Date();
    const message = { message: data.post, date: date };
    if (data.post === post.message) {
      toast.error("Please change your post and update.");
    } else {
      authAxios.put(`/post?id=${post?._id}`, message).then((res) => {
        console.log(res);
        toast.success("Successfull Update");
        reset();
        post.message = data.post;
        setLoading(false);
        setOpen(false);
      });
    }
  };
  return (
    <div>
      <div className="modal" id="edit-post">
        <form onSubmit={handleSubmit(submitPost)} className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Update your Post.</h3>
            <label
              onClick={() => setOpen(false)}
              className="btn btn-sm btn-circle "
            >
              ✕
            </label>
          </div>
          <textarea
            className="textarea textarea-bordered w-full mt-6 "
            {...register("post")}
            placeholder="Write your post..."
            defaultValue={post.message}
          ></textarea>

          <input
            onClick={() => {
              setLoading(true);
            }}
            type="submit"
            value="Post"
            className={`px-3 py-2 w-16 text-center cursor-pointer mt-6 bg-gray-600 rounded-lg font-semibold text-white ${
              loading ? "hidden" : "block"
            }`}
          />
          <button
            className={`px-3 py-2 w-16 text-center cursor-pointer mt-6 bg-gray-600 rounded-lg font-semibold text-white ${
              loading ? "block" : "hidden"
            }`}
          >
            <SmallLoading />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;

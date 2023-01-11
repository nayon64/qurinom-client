import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import SmallLoading from "../SmallLoading/SmallLoading";

const PostModal = ({ setModalOpen, posts, setPosts }) => {
  const { user, authAxios } = useContext(AuthContext);
  const { register, reset, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const submitMessage = (data) => {
    const date = new Date();

    const post = {
      message: data.message,
      publishedDate: date,
      authorName: user.displayName,
      authorPhotoURL: user.photoURL,
      authorEmail: user?.email,
    };

    authAxios.post("/post", post).then((res) => {
      console.log(res);
      if (res.data.acknowledged) {
        toast.success("post create");
        reset();
        const newPosts = [post, ...posts];
        setPosts(newPosts);
        setLoading(false);
        setModalOpen(false);
      }
    });
  };

  return (
    <div>
      {/* The button to open modal */}
      <div className="modal" id="add-post">
        <form onSubmit={handleSubmit(submitMessage)} className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Create a Post.</h3>
            <label
              onClick={() => setModalOpen(false)}
              className="btn btn-sm btn-circle "
            >
              ✕
            </label>
          </div>
          <textarea
            className="textarea textarea-bordered w-full mt-6 "
            name="message"
            {...register("message")}
            placeholder="Write your post..."
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

export default PostModal;

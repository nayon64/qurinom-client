import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditPostModal = ({ post, setOpen }) => {
  const { register, reset, handleSubmit } = useForm();

  const submitPost = (data) => {
    console.log(data.post);
    const date = new Date();
    const message = { message: data.post, date: date };
    if (data.post === post.message) {
      toast.error("Please change your post and update.");
    } else {
      axios
        .put(`http://localhost:5000/post?id=${post?._id}`, message)
        .then((res) => {
          console.log(res);
          toast.success("Successfull Update");
			reset();
			post.message=data.post
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
            type="submit"
            value="Update"
            className="px-3 py-2 w-20 text-center cursor-pointer mt-6 bg-green-400 rounded-lg font-semibold"
          />
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
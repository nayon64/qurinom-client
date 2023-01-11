import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { FcLike, FcRefresh, FcSms } from "react-icons/fc";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import EditPostModal from "../../../Shared/EditPostModal/EditPostModal";

const PostCard = ({ post, setPosts, posts }) => {
  const [open, setOpen] = useState(false);

  const { user, authAxios } = useContext(AuthContext);

  const date = new Date(post?.publishedDate);
  const publishDate = format(date, "pp PP");

  const handleDelete = () => {
    const confirmd = window.confirm("You are delete this post.");
    if (confirmd) {
      authAxios.delete(`/post?_id=${post._id}`).then((res) => {
        console.log(res);
        const remaingPosts = posts.filter((p) => p._id !== post._id);
        setPosts(remaingPosts);
      });
    }
  };

  return (
    <div className="bg-white rounded-lg mt-2 mx-3 mb-5 p-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={post?.authorPhotoURL} alt="" />
            </div>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold">{post?.authorName}</h3>
            <p className="text-xs">{publishDate}</p>
          </div>
        </div>
        {user.email === post.authorEmail && (
          <div className="dropdown dropdown-end">
            <span tabIndex={0} className="text-xl font-bold cursor-pointer">
              ...
            </span>
            <div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-slate-200 rounded-box w-52 font-semibold"
              >
                <li>
                  <a href="#edit-post" onClick={() => setOpen(true)}>
                    Edit
                  </a>
                </li>
                <li>
                  <button onClick={handleDelete}>Delete</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2">
        <p>{post?.message}</p>
      </div>

      <div className="flex items-center justify-between mt-4 border-t pt-2 border-gray-600 ">
        <div className="flex items-center cursor-pointer">
          <FcLike /> <span className="ml-2">Like</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <FcSms /> <span className="ml-2">Comment</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <FcRefresh /> <span className="ml-2">Report</span>
        </div>
      </div>
      {open && <EditPostModal post={post} setOpen={setOpen}></EditPostModal>}
    </div>
  );
};

export default PostCard;

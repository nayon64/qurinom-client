import { format } from "date-fns";
import React from "react";
import { FcLike, FcRefresh, FcSms } from "react-icons/fc";

const PostCard = ({ post }) => {
  console.log(post);

  const date = new Date(post?.publishedDate);
  const publishDate = format(date, "pp PP");

  return (
    <div className="bg-gray-200 rounded-lg mt-2 mx-3 mb-5 p-4">
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
    </div>
  );
};

export default PostCard;

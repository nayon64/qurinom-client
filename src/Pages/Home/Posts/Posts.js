import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import PostCard from "./PostCard";

const Posts = ({ posts, setPosts, loading }) => {
  return (
    <div>
      <h3 className="px-3 my-2 font-bold text-xl text-gray-700">All Recent posts!</h3>

      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <PostCard
                  post={post}
                  key={i}
                  setPosts={setPosts}
                  posts={posts}
                ></PostCard>
              ))
            ) : (
              <h1 className="text-2xl text-center font-bold text-red-600">
                No Post Found
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;

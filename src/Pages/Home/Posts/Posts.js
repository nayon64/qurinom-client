import React from 'react';
import PostCard from './PostCard';

const Posts = ({ posts }) => {
  return (
    <div>
      <h3 className="px-3 my-2 font-bold text-xl">All Recent posts!</h3>
      {posts.length > 0 &&
        posts.map((post,i) => (
          <PostCard post={post} key={i}></PostCard>
        ))}
    </div>
  );
};

export default Posts;
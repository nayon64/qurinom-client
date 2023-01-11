import React from 'react';
import SmallLoading from '../../../Shared/SmallLoading/SmallLoading';
import PostCard from './PostCard';

const Posts = ({ posts, setPosts }) => {
  return (
    <div>
      <h3 className="px-3 my-2 font-bold text-xl">All Recent posts!</h3>
      <SmallLoading></SmallLoading>
      {posts.length > 0 &&
        posts.map((post, i) => (
          <PostCard post={post} key={i} setPosts={setPosts} posts={posts}></PostCard>
        ))}
    </div>
  );
};

export default Posts;
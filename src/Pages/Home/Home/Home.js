import axios from "axios";
import React, { useEffect, useState } from "react";
import PostModal from "../../../Shared/PostModal/PostModal";
import AddPost from "../AddPost/AddPost";
import Posts from "../Posts/Posts";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://qurinom-server.vercel.app/posts").then((res) => {
      setPosts(res?.data);
    });
  }, []);

  return (
    <div>
      <AddPost setModalOpen={setModalOpen}></AddPost>
      <Posts posts={posts}></Posts>
      {modalOpen && (
        <PostModal
          setModalOpen={setModalOpen}
          posts={posts}
          setPosts={setPosts}
        ></PostModal>
      )}
    </div>
  );
};

export default Home;

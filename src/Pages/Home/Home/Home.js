import axios from "axios";
import React, { useEffect, useState } from "react";
import PostModal from "../../../Shared/PostModal/PostModal";
import AddPost from "../AddPost/AddPost";
import Posts from "../Posts/Posts";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res) => {
      setPosts(res?.data);
    });
  }, []);

  return (
    <div>
      <AddPost setModalOpen={setModalOpen}></AddPost>
      <Posts posts={posts}></Posts>

      <h1>This is home section</h1>
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

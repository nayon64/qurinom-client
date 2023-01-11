import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import PostModal from "../../../Shared/PostModal/PostModal";
import AddPost from "../AddPost/AddPost";
import Posts from "../Posts/Posts";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { authAxios } = useContext(AuthContext);

  useEffect(() => {
    authAxios.get("/posts").then((res) => {
      setPosts(res?.data);
    });
  }, [authAxios]);

  return (
    <div>
      <AddPost setModalOpen={setModalOpen}></AddPost>
      <Posts posts={posts} setPosts={setPosts}></Posts>
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

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import PostModal from "../../../Shared/PostModal/PostModal";
import AddPost from "../AddPost/AddPost";
import Posts from "../Posts/Posts";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user, authAxios } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // all posts get
  useEffect(() => {
    authAxios.get("/posts").then((res) => {
      setPosts(res?.data);
      setLoading(false);
    });
  }, [authAxios]);

  return (
    <div>
      {user?.uid && (
        <div>
          <AddPost setModalOpen={setModalOpen}></AddPost>
          <Posts posts={posts} setPosts={setPosts} loading={loading}></Posts>
          {modalOpen && (
            <PostModal
              setModalOpen={setModalOpen}
              posts={posts}
              setPosts={setPosts}
            ></PostModal>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

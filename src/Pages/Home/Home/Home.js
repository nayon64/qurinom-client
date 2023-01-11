import React, { useState } from 'react';
import PostModal from '../../../Shared/PostModal/PostModal';
import AddPost from '../AddPost/AddPost';

const Home = () => {
	const [modalOpen, setModalOpen]=useState(false)



	return (
    <div>
      <AddPost setModalOpen={setModalOpen}></AddPost>

      <h1>This is home section</h1>
      {modalOpen && <PostModal setModalOpen={setModalOpen}></PostModal>}
    </div>
  );
};

export default Home;
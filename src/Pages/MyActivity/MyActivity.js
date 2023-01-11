import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import PostCard from '../Home/Posts/PostCard';

const MyActivity = () => {

	const [myPosts, setMyPosts] = useState([])
	const { user } = useContext(AuthContext)
	
	
	useEffect(() => {
		axios
      .get(`http://localhost:5000/userPosts?email=${user?.email}`)
      .then((res) => {
		  const data = res?.data
		  setMyPosts(data)
      });
	}, [user])
	

	return (
		<div>
			<h1>My Activity page.</h1>
			<div>
				{
					myPosts.length>0 && myPosts.map(post=><PostCard key={post._id} post={post}></PostCard>)
				}
			</div>
		</div>
	);
};

export default MyActivity;
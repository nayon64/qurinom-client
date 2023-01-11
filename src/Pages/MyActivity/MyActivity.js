import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import PostCard from "../Home/Posts/PostCard";

const MyActivity = () => {
  const [myPosts, setMyPosts] = useState([]);
	const { user, authAxios } = useContext(AuthContext);
	const [loading,setLoading]=useState(true)

  useEffect(() => {
    authAxios.get(`/userPosts?email=${user?.email}`).then((res) => {
		const data = res?.data;
		setLoading(false)
      setMyPosts(data);
    });
  }, [user, authAxios]);

  // setPosts, posts;
  return (
    <div>
      <h1 className="text-center text-xl font-bold text-gray-600 my-4">
        My Activity.
      </h1>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {myPosts.length > 0 ? (
              myPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  posts={myPosts}
                  setPosts={setMyPosts}
                ></PostCard>
              ))
            ) : (
              <h1 className="text-2xl text-center font-bold text-red-400">
                No Post Found
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivity;

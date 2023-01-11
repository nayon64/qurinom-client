import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const UserProfile = () => {

	const {user}=useContext(AuthContext)
	
	return (
    <div className=''>
      {/* user image  */}
      <div className="sticky top-20 mx-3 mt-2 border rounded-md overflow-hidden hidden md:block">
        <div className="relative ">
          <img
            className="w-full h-28 object-cover"
            src="https://images.unsplash.com/photo-1661961110144-12ac85918e40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <div className="avatar -mt-12 w-full">
            <div className="w-24 rounded-full mx-auto border-2">
              <img src={user?.photoURL} alt="" />
            </div>
          </div>
        </div>
        {/* user details  */}
        <div className=" text-center mb-4">
          <h3 className="text-xl font-bold">{user?.displayName}</h3>
          <p className="text-xs mt-1 px-8">
            MERN Developer || Full Stack Developer || Web Developer
          </p>
        </div>
        <hr></hr>
        <div className="text-xs p-3 font-semibold">
          <p className="flex justify-between">
            Who's Views your profile <span>25</span>
          </p>
          <p className="flex justify-between mt-2">
            Who's impress your profile <span>00</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
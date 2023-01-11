import React from 'react';
import ad from "../../Assets/video/ad.mp4"
const RightSideBanner = () => {
	return (
    <div className="hidden md:block p-2 ">
      <div className="sticky top-20">
        <video autoPlay controls>
          <source src={ad} type="video/mp4" />
        </video>
        <img
          className="mt-2"
          src="https://images.unsplash.com/photo-1621569898825-ef12e7592f94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default RightSideBanner;
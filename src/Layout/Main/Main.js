import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import RightSideBanner from "../../Shared/RightSideBanner/RightSideBanner";
import UserProfile from "../../Shared/UserProfile/UserProfile";

const Main = () => {
  return (
    <div className="bg-gray-300 min-h-screen">
      <Navbar></Navbar>
      <div className="grid md:grid-cols-5">
        <UserProfile></UserProfile>
        <div className="col-span-3">
          <Outlet></Outlet>
        </div>
        <RightSideBanner></RightSideBanner>
      </div>
    </div>
  );
};

export default Main;

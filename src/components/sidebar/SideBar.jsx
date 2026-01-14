import React from "react";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div>
      <div className="w-[350px] h-screen p-7 flex flex-col bg-[#1B5E20]">
        <img src="/Tron2.png" className="w-[50px] h-[60px]"></img>
        <img src="/Tron3.png" className="w-[100px] h-[50px]"></img>
      </div>

      <div>
        <NavLink></NavLink>
      </div>
    </div>
  );
};

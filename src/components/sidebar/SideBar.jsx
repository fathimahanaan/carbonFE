import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { navItems } from "../../utils/NavItems";
 
export const SideBar = () => {
  return (
    <div>
      <div className="w-[350px] h-screen p-7 flex flex-col bg-[#1B5E20]">
        <img src="/Tron2.png" className="w-[50px] h-[60px]"></img>
        <img src="/Tron3.png" className="w-[100px] h-[50px]"></img>
      </div>

      <div>
        <NavLink
          to="/"
          className={({
            isActive,
          }) => `flex items-center gap-3 py-2 rounded-sm transition duration-300
        ${
          isActive
            ? "bg-[#48089F] text-white"
            : "text-white hover:text-[#c7b1e6] hover:outline hover:outline-[#FAEBEB]"
        }`}
        >
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        {navItems.map((item) => (
          <navItems
            key={item.id}
            icon={item.icon}
            name={item.name}
            path={item.path}
            location={location?.pathname}
          />
        ))}
      </div>
    </div>
  );
};

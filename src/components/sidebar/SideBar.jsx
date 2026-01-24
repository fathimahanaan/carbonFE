import React from "react";
 
import { navItems } from "../../utils/NavItems";
import { NavItem } from "./NavItem";
import { NavLink } from "react-router-dom";
import { CgInsights } from "react-icons/cg";

export const SideBar = () => {
  return (
    <div className="w-[320px] h-screen p-6 flex flex-col
                    bg-white/10 backdrop-blur-md border border-green-500/10
                    shadow-lg ">
      <div className="flex items-center gap-3 mb-8">
        <img src="/earthh.png" className="w-[50px] h-[60px]" />
    <p className="text-green-900 font-semibold">Carbon Footprint Tracker</p>
      </div>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-300
           ${
             isActive
               ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-xl"
               : "text-green-900 hover:bg-[#f0fff4] hover:text-green"
           }`
        }
      >
        <CgInsights size={20} />
        <span className="font-semibold">Insights</span>
      </NavLink>

      <div className="mt-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            path={item.path}
            icon={item.icon}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

import React from "react";
import { navItems } from "../../utils/NavItems";
import { NavItem } from "./NavItem";
import { NavLink } from "react-router-dom";
import { CgInsights } from "react-icons/cg";
import { TbLeaf2 } from "react-icons/tb";

export const SideBar = () => {
  return (
    <div
      className="w-[350px] h-screen p-6 flex flex-col
                 bg-white/20 backdrop-blur-xl
                 border-r border-green-500/20
                 shadow-xl"
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/earthh.png" alt="logo" className="w-[50px] h-[60px]" />
        <div>
          <p className="text-green-900 font-bold text-lg leading-tight">
            Carbon Tracker
          </p>
          <span className="text-sm font-semibold text-green-700">
            Reduce • Track • Learn
          </span>
        </div>
      </div>

      {/* Primary Action */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-xl mb-6 transition-all duration-300
           ${
             isActive
               ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-lg"
               : "text-green-900 hover:bg-green-50 hover:text-green-800"
           }`
        }
      >
        <CgInsights size={22} />
        <div className="flex flex-col leading-tight">
          <span className="font-semibold">Insights</span>
          <span className="text-xs  font-semibold opacity-80">
            Your carbon overview
          </span>
        </div>
      </NavLink>

      {/* Section Label */}

      {/* Navigation Items */}
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            path={item.path}
            icon={item.icon}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-auto   pt-6 border-t border-green-500 ">
        <p className="text-xs text-green-900 font-semibold flex items-center gap-2">
          <TbLeaf2 size={40} />
          Track your footprint and make smarter choices every day.
        </p>
      </div>
    </div>
  );
};

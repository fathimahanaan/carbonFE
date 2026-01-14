// SideBar.jsx
import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { navItems } from '../../utils/NavItems';
import { NavItem } from './NavItem';
import { NavLink } from 'react-router-dom';

export const SideBar = () => {
  return (
    <div className="w-[350px] h-screen p-7 flex flex-col bg-[#1B5E20]">
      <img src="/Tron2.png" className="w-[50px] h-[60px]" />
      <img src="/Tron3.png" className="w-[100px] h-[50px]" />

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-3 py-2 mt-10 rounded-sm ${
            isActive ? "bg-[#ECFDF5] text-[#14532D]" : "text-white hover:text-black"
          }`
        }
      >
        <MdDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>

      <div className="mt-5 flex flex-col gap-2">
        {navItems.map(item => (
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

 
import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ path, icon, name }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
         ${
           isActive
             ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-lg"
             : "bg-white text-[#006400] hover:bg-[#f0fff4] hover:text-[#004d00]"
         }`
      }
    >
      {icon}
      <span className="font-semibold">{name}</span>
    </NavLink>
  );
};


// `location` holds the current URL (e.g., location.pathname = "/activity").
// It can be used to highlight the active link manually:
//   const isActive = location.pathname === item.path;
//   <div className={isActive ? "bg-purple-700" : ""}>{item.name}</div>
// With <NavLink>, we can do the same automatically:
//   <NavLink to={item.path} className={({ isActive }) => isActive ? "bg-purple-700" : ""}>
//     {item.name}
//   </NavLink>

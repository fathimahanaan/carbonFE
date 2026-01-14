 
import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ path, icon, name }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-sm text-white hover:text-[#c7b1e6] ${
          isActive ? "bg-[#48089F] text-white" : ""
        }`
      }
    >
      {icon}
      <span>{name}</span>
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

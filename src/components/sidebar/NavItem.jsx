import React from "react";
import { NavLink } from "react-router-dom";

export const NavItem = ({ path, icon, name, description }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-300
        ${
          isActive
            ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-lg"
            : "bg-white/80 text-[#006400] hover:bg-[#f0fff4] hover:text-[#004d00]"
        }`
      }
    >
      {/* Icon */}
      <div
        className={`text-xl transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-sm">{name}</span>
        {description && (
          <span className=" font-semibold text-xs opacity-70">
            {description}
          </span>
        )}
      </div>
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

// import React from "react";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineLiveHelp } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { LuMessageSquareQuote } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const getNavLinkClass = (isActive) =>
    `flex items-center justify-center space-x-2 w-full py-2 rounded-[8px] transition-all
    hover:bg-[#5932EA] hover:text-white
      ${isActive ? "bg-[#5932EA] text-white" : ""}`;

  return (
    <>
      <div
        className="flex flex-col items-center font-poppins text-[17px] text-[#9197B3] font-medium bg-white w-[310px] my-2 rounded-[25px] p-[40px]
      space-y-[40px] shadow-lg"
      >
        <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
          <IoKeyOutline size={18} />
          <div>Dashboard</div>
        </NavLink>

        <NavLink
          to="/employees-list"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <FaUsers size={18} />
          <div>Employees List</div>
        </NavLink>

        <NavLink
          to="/request-leave"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <LuMessageSquareQuote size={18} />
          <div>Request List</div>
        </NavLink>

        <NavLink
          to="/create-request"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <LuMessageSquareQuote size={18} />
          <div>Create Request</div>
        </NavLink>

        <NavLink
          to="/create-employees"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <LuMessageSquareQuote size={18} />
          <div>Create Employees</div>
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <MdOutlineLiveHelp size={18} />
          <div>Help</div>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;

// import React from "react";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineLiveHelp } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { LuMessageSquareQuote } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { message } from "antd";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Sidebar = () => {
  const getNavLinkClass = (isActive) =>
    `flex items-center justify-center space-x-2 w-full py-2 rounded-[8px] transition-all
    hover:bg-[#5932EA] hover:text-white
      ${isActive ? "bg-[#5932EA] text-white" : ""}`;

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear data
    localStorage.removeItem("access_token");
    setUser({
      id: "",
      name: "",
      email: "",
      role: "",
    });
    message.success("Logout successfully");
    // redirect to home
    navigate("/login");
  };

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

        {user?.role === "MANAGER" && (
          <>
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
          </>
        )}

        {user?.role === "EMPLOYEE" && (
          <>
            <NavLink
              to="/create-request"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <LuMessageSquareQuote size={18} />
              <div>Create Request</div>
            </NavLink>
          </>
        )}

        <NavLink
          to="/help"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <MdOutlineLiveHelp size={18} />
          <div>Help</div>
        </NavLink>

        <button
          className="bg-red-600 hover:bg-red-700 p-2 rounded-md text-white w-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;

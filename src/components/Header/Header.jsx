// import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GrNotification } from "react-icons/gr";
import { MdOutlineNightlight } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="h-[80px] px-[24px] bg-[#7667EA] flex items-center justify-between shadow-lg">
        {/* Logo  */}
        <Link
          href
          to={"/"}
          className="text-[46px] w-[246px] text-white font-poppins font-medium"
        >
          A Plus Plus
        </Link>

        {/* Name employees */}
        <div className="flex items-center justify-center font-roboto space-x-[17px]">
          <Link to="/profile" className="p-2 bg-white rounded-full">
            <MdOutlineAccountCircle size={20} />
          </Link>

          <div className="text-[20px] w-[164px] text-nowrap font-semibold text-white">
            {user.name}
          </div>
          <div>|</div>
          <div className="p-2 bg-white rounded-full">
            <GrNotification size={20} />
          </div>
          <div className="p-2 bg-white rounded-full">
            <MdOutlineNightlight size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

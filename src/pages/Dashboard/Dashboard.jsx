import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import dashboardLogo from "../../assets/images/Company.webp";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const targetDate = new Date("2025-12-31"); // Ngày mục tiêu
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const timeDiff = targetDate - today;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };

    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 86400000); // Cập nhật mỗi ngày
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-[90%] p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-3xl">
        <img
          src={dashboardLogo}
          alt="Company Logo"
          className="w-32 h-32 mx-auto mb-4 rounded-full"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "Guest"}!
        </h1>
        <p className="text-lg text-gray-600 mt-2">Remaining Leave Days:</p>
        <span className="text-4xl font-bold text-blue-500 mt-4">
          {user?.leaveDays} days
        </span>
      </div>
    </div>
  );
};

export default Dashboard;

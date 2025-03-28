// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SidebarLayout from "./components/layout/SidebarLayout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import RequestLeave from "./pages/RequestLeave/RequestLeave";
import EmployeesList from "./pages/EmployeesList/EmployeesList";

import CreateLeaveRequest from "./pages/CreateLeaveRequest/CreateLeaveRequest";

import Profile from "./pages/Profile/Profile";

// Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Authenticated
import PrivateRoute from "./components/routes/PrivateRoute";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { getMyInfo } from "./services/api.service";
import { Spin } from "antd";
function App() {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAPI();
  }, []);

  const fetchUserAPI = async () => {
    setIsLoading(true);
    if (token) {
      const res = await getMyInfo();
      if (res.data) {
        setUser(res.data.myInfoDTO);
      }
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* All roles */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<SidebarLayout></SidebarLayout>} />

        <Route
          path="/profile"
          element={
            <SidebarLayout>
              <Profile />
            </SidebarLayout>
          }
        />

        <Route
          path="/request-leave"
          element={
            <PrivateRoute role="MANAGER">
              <SidebarLayout>
                <RequestLeave />
              </SidebarLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/employees-list"
          element={
            <SidebarLayout>
              <EmployeesList />
            </SidebarLayout>
          }
        />

        <Route
          path="/create-request"
          element={
            <SidebarLayout>
              <CreateLeaveRequest />
            </SidebarLayout>
          }
        />

        {/* Admin routes */}
        {/* <Route
          path=""
          element={
            <SidebarLayout>
              
            </SidebarLayout>
          }
        /> */}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

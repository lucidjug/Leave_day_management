// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SidebarLayout from "./components/layout/SidebarLayout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import RequestLeave from "./pages/RequestLeave/RequestLeave";
import EmployeesList from "./pages/EmployeesList/EmployeesList";

import CreateLeaveRequest from "./pages/CreateLeaveRequest/CreateLeaveRequest";
import CreateEmployees from "./pages/CreateEmployees/CreateEmployees";
import Profile from "./pages/Profile/Profile";

// Pages
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword/ResetPassword";

// import HomePage from "./pages/HomePage/HomePage";
// import Dashboard from "./pages/Dashboard/Dashboard";

// Admin

// User

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth routes */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}

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
            <SidebarLayout>
              <RequestLeave />
            </SidebarLayout>
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

        <Route
          path="/create-employees"
          element={
            <SidebarLayout>
              <CreateEmployees />
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

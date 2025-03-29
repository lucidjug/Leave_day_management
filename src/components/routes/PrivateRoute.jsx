import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Result, Button, Spin } from "antd";
import { getMyInfo } from "../../services/api.service";

const PrivateRoute = ({ role, children }) => {
  const { user, setUser, isLoading } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  if (isLoading) return;
  if (role && user.role !== role) {
    return (
      <Result
        status="403"
        title="Unauthorized!"
        subTitle="You are not authorized to access this page."
        extra={
          <div className="flex justify-center items-center">
            <Button type="primary">
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        }
      />
    );
  }

  return children;
};

export default PrivateRoute;

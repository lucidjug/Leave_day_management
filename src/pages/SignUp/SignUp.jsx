import React from "react";
import { useState } from "react";
import { Button, Input, Form, Checkbox, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom'
// import { AppleOutlined, GoogleOutlined, TwitterOutlined, FacebookOutlined } from "@ant-design/icons";
import "./SignUp.css";
import LoginImg from "../../assets/login.webp";

const { Title, Text } = Typography;

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div id="PageLogin">
      <div id="LoginImg">
        <img src={LoginImg} alt="Login" />
      </div>

      <div className="Login">
        <Card className="login-card">
          <Title level={2} className="login-title" style={{ color: "#4096ff", marginBottom: "0" }}>
            SIGN UP
          </Title>
          <Text type="secondary" style={{ display: "block", marginBottom: "2em" }}>
            Creat your account in seconds
          </Text>

          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="name"
              label="Full name"
              rules={[
                { required: true, message: "Please enter your full name!" },
                { pattern: /^[A-Za-z\s]+$/, message: "Full name can only contain letters!" }
              ]}
              style={{ display: "block", marginBottom: "1em", }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Dang Thi Quynh"
                style={{ padding: "10px 20px", fontSize: "16px", height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email format!" },
              ]}
              style={{ display: "block", marginBottom: "1em", }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="info@example.co"
                style={{ padding: "10px 20px", fontSize: "16px", height: "45px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password!" }]}
              style={{ display: "block", marginBottom: "1em" }}
            >
              <Input.Password prefix={<LockOutlined />}
                placeholder="Enter your password"
                style={{ padding: "10px 20px", fontSize: "16px", height: "45px" }} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Confirm password"
              rules={[{ required: true, message: "Please enter your password!" }]}
              style={{ display: "block", marginBottom: "1em" }}
            >
              <Input.Password prefix={<LockOutlined />}
                placeholder="Enter your password"
                style={{ padding: "10px 20px", fontSize: "16px", height: "45px" }} />
            </Form.Item>

            <Form.Item>
              <div className="login-options">
                <Checkbox>I agree to the Terms of services and privacy policy</Checkbox>
                {/* <NavLink to="/" className="forgot-password">Forgot password ?</NavLink> */}
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block >
                Create an account
              </Button>
            </Form.Item>
          </Form>

          <Text>
            Already a member? <NavLink to="/login">Log in</NavLink>
          </Text>

        </Card>
      </div>
    </div>
  );
};

export default SignUp;

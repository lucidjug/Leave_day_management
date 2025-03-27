import { useState } from "react";
import { Button, Input, Form, Checkbox, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AppleOutlined, GoogleOutlined, TwitterOutlined, FacebookOutlined } from "@ant-design/icons";
import "./Login.css";
import LoginImg from "../../assets/login.webp";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Thông tin đăng nhập:", values);
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
            Login
          </Title>
          <Text type="secondary" style={{ display: "block", marginBottom: "2em" }}>
            please enter your login detail to sign in
          </Text>

          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email format!" },
              ]}
              style={{ display: "block", marginBottom: "1em",  }}
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
                style={{ padding: "10px 20px", fontSize: "16px", height: "45px" }}/>
            </Form.Item>

            <Form.Item>
              <div className="login-options">
                <Checkbox>Keep me logged in</Checkbox>
                <a href="#" className="forgot-password">Forgot password ?</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block >
                Log in
              </Button>
            </Form.Item>
          </Form>

          <Text>
            Don’t have an account? <a href="#">Sign in</a>
          </Text>

          <div className="social-login">
            <Text type="secondary">or continue with</Text>
            <div className="social-icons">
              <Button shape="circle" icon={<AppleOutlined />} size="large" />
              <Button shape="circle" icon={<GoogleOutlined />} size="large" />
              <Button shape="circle" icon={<TwitterOutlined />} size="large" style={{ color: "#4096ff" }} />
              <Button shape="circle" icon={<FacebookOutlined />} size="large" style={{ color: "#4096ff" }} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;

import { useContext, useState } from "react";
import {
  Button,
  Input,
  Form,
  Checkbox,
  Card,
  Typography,
  message,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import {
  AppleOutlined,
  GoogleOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

import "./Login.css";
import LoginImg from "../../assets/login.webp";
import { NavLink } from "react-router-dom";
import { loginAPI } from "../../services/api.service";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";

import { getMyInfo } from "../../services/api.service";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await loginAPI(values.email, values.password);
      if (res.data && res.data.token) {
        message.success("Login successfully!");
        localStorage.setItem("access_token", res.data.token);

        const response = await getMyInfo();
        if (response.data) {
          setUser(response.data.myInfoDTO);
        }

        navigate("/");
      } else {
        notification.error({
          message: "Error Login",
          description: res.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error Login",
        description: "Email or password is incorrect",
      });
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="PageLogin">
      <div id="LoginImg">
        <img src={LoginImg} alt="Login" />
      </div>

      <div className="Login">
        <Card className="login-card">
          <Title
            level={2}
            className="login-title"
            style={{ color: "#4096ff", marginBottom: "0" }}
          >
            Login
          </Title>

          <Text
            type="secondary"
            style={{ display: "block", marginBottom: "2em" }}
          >
            please enter your login detail to sign in
          </Text>

          <Form form={form} name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email format!" },
              ]}
              style={{ display: "block", marginBottom: "1em" }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="info@example.co"
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  height: "45px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              style={{ display: "block", marginBottom: "1em" }}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  height: "45px",
                }}
              />
            </Form.Item>

            <Form.Item>
              <div className="login-options">
                <Checkbox>Keep me logged in</Checkbox>

                <a href="#" className="forgot-password">
                  Forgot password ?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Log in
              </Button>
            </Form.Item>
          </Form>

          <Text>
            Don’t have an account? <Link to="/register">Sign up</Link>
          </Text>

          <div className="social-login">
            <Text type="secondary">or continue with</Text>
            <div className="social-icons">
              <Button shape="circle" icon={<AppleOutlined />} size="large" />
              <Button shape="circle" icon={<GoogleOutlined />} size="large" />
              <Button
                shape="circle"
                icon={<TwitterOutlined />}
                size="large"
                style={{ color: "#4096ff" }}
              />
              <Button
                shape="circle"
                icon={<FacebookOutlined />}
                size="large"
                style={{ color: "#4096ff" }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;

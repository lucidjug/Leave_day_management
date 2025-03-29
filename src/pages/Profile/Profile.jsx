import { useContext, useState } from "react";
import "./Profile.css";
import { Button, Input, Form, Modal } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import avatar from "../../assets/images/default-avatar.png";
import { AuthContext } from "../../context/AuthContext";

dayjs.extend(customParseFormat);

// const dateFormat = "YYYY-MM-DD";

export default function Profile() {
 const { user } = useContext(AuthContext);
 console.log(user);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   mssv: "",
  //   email: "",
  //   role: "ADMIN",
  // });

  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [password, setPassword] = useState({
  //   oldPassword: "",
  //   password: "",
  // });
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEditClick = () => {
  //   setIsEditing(!isEditing);
  // };

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  //   setPassword({ oldPassword: "", password: "" });
  // };

  // const handleInputChange = (name) => (event) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: event.target.value,
  //   }));
  // };

  // const handleDateChange = (date) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     birthDate: date ? date.format(dateFormat) : "",
  //   }));
  // };



  return (
    <div id="wrapper">
      {/* <div id="header">
        <h1>Thông tin người dùng</h1>
      </div> */}
      <div className="outer">
        <div className="profile-container" style={{ padding: "20px" }}>
          <h2>PERSONAL INFORMATION</h2>
          <div className="header-container">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <div className="email-container">
              <div>
                {user.name}
              </div>
              <p className="email">{user.email}</p>
            </div>
            {/* <div className="change-password">
              <Button onClick={handleEditClick}>Edit</Button>
              <Button onClick={showModal}>
                <KeyOutlined /> Change password
              </Button>
            </div> */}
          </div>

          <Form layout="vertical">
            <Form.Item label="Full name">
              <Input
                // style={{ width: "50%" }}
                placeholder="Name"
                value={user.name}
                // onChange={handleInputChange("Name")}
                disabled={true}
              />
            </Form.Item>

            <Form.Item label="ID">
              <Input value={user.id} disabled />
            </Form.Item>
{/* 
            <Form.Item label="Number of leave days">
              <Input value={user.leaveDays} disabled />
            </Form.Item> */}

            <Form.Item label="Email">
              <Input value={user.email} disabled />
            </Form.Item>

            <Form.Item label="Role">
              <Input value={user.role} disabled />
            </Form.Item>

            {/* <Form.Item style={{ textAlign: "center", marginTop: "10px" }}>
              <Button type="primary" disabled={!isEditing}>
                Lưu thay đổi
              </Button>
            </Form.Item> */}
          </Form>
        </div>
        {/* <Modal
          title="Đổi mật khẩu"
          visible={isModalVisible}
          onOk={handleCancel}
          onCancel={handleCancel}
          okText="Đổi mật khẩu"
          cancelText="Hủy"
        >
          <Form layout="vertical">
            <Form.Item label="Mật khẩu cũ">
              <Input.Password
                value={password.oldPassword}
                onChange={(e) =>
                  setPassword({ ...password, oldPassword: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              <Input.Password
                value={password.password}
                onChange={(e) =>
                  setPassword({ ...password, password: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Modal> */}
      </div>
    </div>
  );
}

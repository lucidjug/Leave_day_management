import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Space, Table, Button, message } from "antd";
import { fetchAll, deleteUser, getUserById, updateUser } from "../../services/api.service";
import Search_Input from "../../components/Search_Input/Search_Input";
import FilterInput from "../../components/FilterInput/FilterInput";
import { FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";

const EmployeesList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetchAll();
      setEmployeeList(res.data.userDTOList);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mở modal update, fill sẵn form
  const handleUpdateRequest = async (id) => {
    try {
      const res = await getUserById(id);
      const user = res.data.userDTO;
      setSelectedUser(user);
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        password: ""
      });
      setIsModalOpen(true);
    } catch (error) {
      message.error("User not found");
    }
  };

  // Xử lý update khi bấm Save
  const handleUpdateSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      await updateUser(selectedUser.id, values.name, values.email, values.password);
      message.success("Update successfully");
      setIsModalOpen(false);
      fetchData(); // reload lại danh sách
    } catch (error) {
      message.error("Update failed");
    }
  };

  // Xử lý delete user
  const handleDeleteRequest = async (id) => {
    try {
      await deleteUser(id);
      message.success("Delete user successfully");
      fetchData();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleUpdateRequest(record.id)}>
            <FaPencil size={20} className="text-yellow-500" />
          </button>
          <button onClick={() => handleDeleteRequest(record.id)}>
            <IoTrashBin size={20} className="text-red-500" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">All Employees</h1>
      <div className="flex items-center justify-between mb-6">
        <Search_Input />
        <FilterInput />
      </div>

      <Table
        className="rounded-lg border"
        columns={columns}
        dataSource={employeeList}
        rowKey="id"
        pagination={{ pageSize: 20 }}
      />

      {/* Modal Update */}
      <Modal
        title="Update User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdateSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Leave blank to keep old password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeesList;

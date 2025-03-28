import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Space, Table, Button, message, Drawer, Tag } from "antd";
import {
  fetchAll,
  deleteUser,
  getUserById,
  updateUser,
  getRequestLeaveByUserId,
} from "../../services/api.service";
import Search_Input from "../../components/Search_Input/Search_Input";
import FilterInput from "../../components/FilterInput/FilterInput";
import { FaEyeSlash, FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { EyeOutlined } from "@ant-design/icons";

const EmployeesList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);
  const [requestLeaveList, setRequestLeaveList] = useState([]);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(1);

  const [pageRequest, setPageRequest] = useState(1);
  const [sizeRequest, setSizeRequest] = useState(5);
  const [totalRequest, setTotalRequest] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetchAll(current - 1, pageSize);
      setEmployeeList(res.data.userDTOList);
      setTotal(res.data.totalElements);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [current, pageSize]);

  useEffect(() => {
    if (isDrawerOpen && selectedUser?.id) { // Kiểm tra selectedUser có tồn tại
      getRequestLeaveByUserId(selectedUser.id, pageRequest - 1, sizeRequest)
        .then((res) => {
          setRequestLeaveList(res.data.leaveRequestDTOList);
          setTotalRequest(res.data.totalElements);
        })
        .catch(() => {
          message.error("Failed to fetch request leave data");
        });
    }
  }, [pageRequest, sizeRequest, isDrawerOpen, selectedUser]);

  // Mở modal update, fill sẵn form
  const handleUpdateUser = async (id) => {
    try {
      const res = await getUserById(id);
      const user = res.data.userDTO;
      setSelectedUser(user);
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        password: "",
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
      await updateUser(
        selectedUser.id,
        values.name,
        values.email,
        values.password
      );
      message.success("Update successfully");
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      message.error("Update failed");
    }
  };

  // Xử lý delete user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      message.success("Delete user successfully");
      fetchData();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const handleViewRequest = async (id) => {
    try {
      setPageRequest(1);
      setSizeRequest(5);

      const res = await getUserById(id);
      setSelectedUser(res.data.userDTO);

      const leaveRes = await getRequestLeaveByUserId(id, 0, sizeRequest);
      setRequestLeaveList(leaveRes.data.leaveRequestDTOList);
      setTotalRequest(leaveRes.data.totalElements);

      setIsDrawerOpen(true);
    } catch (error) {
      message.error("Failed to fetch request leave data");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "View Request",
      render: (_, record) => (
        <Space size="middle" style={{ fontSize: "20px", paddingLeft: "30px", display: "flex" }}>
          <button onClick={() => handleViewRequest(record.id)}>
            <EyeOutlined size={20} className="text-yellow-500" />
          </button>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleUpdateUser(record.id)}>
            <FaPencil size={20} className="text-yellow-500" />
          </button>
          <button onClick={() => handleDeleteUser(record.id)}>
            <IoTrashBin size={20} className="text-red-500" />
          </button>
        </Space>
      ),
    },
  ];

  const requestColumns = [
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "ACCEPTED"
            ? "green"
            : status === "REJECTED"
              ? "red"
              : "gold";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // setCurrent, setPageSize
    // nếu thay đổi trang: current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }

    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

  const onChangeRequest = (pagination, filters, sorter, extra) => {
    // setCurrent, setPageSize
    // nếu thay đổi trang: current
    if (pagination && pagination.current) {
      if (+pagination.current !== +pageRequest) {
        setPageRequest(+pagination.current);
      }
    }

    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +sizeRequest) {
        setSizeRequest(+pagination.pageSize);
      }
    }
  };
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg w-full">
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
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

      {/* Modal Update */}
      <Modal
        title="Update User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className="flex items-center space-x-2">
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={handleUpdateSubmit}>
              OK
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item label="Password" name="password">
            <Input.Password placeholder="Leave blank to keep old password" />
          </Form.Item> */}
        </Form>
      </Modal>

      <Drawer
        title="Request Leave Details"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={600}
      >
        <Table
          columns={requestColumns}
          dataSource={requestLeaveList}
          rowKey="id"
          pagination={{
            current: pageRequest,
            pageSize: sizeRequest,
            showSizeChanger: true,
            total: totalRequest,
            showTotal: (total, range) => {
              return (
                <div>
                  {" "}
                  {range[0]}-{range[1]} trên {total} rows
                </div>
              );
            },
          }}
          onChange={onChangeRequest}
        />
      </Drawer>

    </div>
  );
};

export default EmployeesList;

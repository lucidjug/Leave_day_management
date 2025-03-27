import React, { useState } from "react";
import { Space, Table, Tag, Modal, Form, Input } from "antd";
import { FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import Search_Input from "../../components/Search_Input/Search_Input";
import FilterInput from "../../components/FilterInput/FilterInput";
import { Select } from "antd";
const { Option } = Select;

const RequestLeave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [idRequest, setIdRequest] = useState("");

  const handleUpdateRequest = (record) => {
    setEditData(record);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (id) => {
    console.log(`delete request ${id}`);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Employee ID", dataIndex: "employee_id", key: "employee_id" },
    { title: "Manager ID", dataIndex: "manager_id", key: "manager_id" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "Accept" ? "green" : status === "Reject" ? "red" : "gold";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleUpdateRequest(record)}>
            <FaPencil size={20} className="text-yellow-500" />
          </button>
          <button onClick={() => handleDeleteRequest(record.id)}>
            <IoTrashBin size={20} className="text-red-500" />
          </button>
        </Space>
      ),
    },
  ];

  const RequestLeavedata = [
    {
      id: "1",
      employee_id: "John Brown",
      manager_id: "Alice Smith",
      startDate: "01/01/2025",
      endDate: "01/02/2025",
      reason: "Sick",
      status: "Accept",
    },
    {
      id: "2",
      employee_id: "Jane Doe",
      manager_id: "Bob Johnson",
      startDate: "02/01/2025",
      endDate: "02/05/2025",
      reason: "Vacation",
      status: "Pending",
    },
    {
      id: "3",
      employee_id: "Jane Doe",
      manager_id: "Bob Johnson",
      startDate: "02/01/2025",
      endDate: "02/05/2025",
      reason: "Vacation",
      status: "Reject",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Request Leave</h1>
      <div className="flex items-center justify-between mb-6">
        <Search_Input />
        <FilterInput />
      </div>

      <Table
        className="rounded-lg border"
        columns={columns}
        dataSource={RequestLeavedata}
      />

      <Modal
        title="Update Request"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => console.log("Updated Data:", editData)}
      >
        <Form layout="vertical">
          <Form.Item label="Employee ID">
            <Input
              value={editData?.employee_id}
              onChange={(e) =>
                setEditData({ ...editData, employee_id: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Manager ID">
            <Input
              value={editData?.manager_id}
              onChange={(e) =>
                setEditData({ ...editData, manager_id: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Start Date">
            <Input
              value={editData?.startDate}
              type="date"
              onChange={(e) =>
                setEditData({ ...editData, startDate: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="End Date">
            <Input
              value={editData?.endDate}
              type="date"
              onChange={(e) =>
                setEditData({ ...editData, endDate: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Reason">
            <Input
              value={editData?.reason}
              onChange={(e) =>
                setEditData({ ...editData, reason: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Status">
            <Select
              value={editData?.status}
              onChange={(value) => setEditData({ ...editData, status: value })}
            >
              <Option value="Accept">APPROVED</Option>
              <Option value="Reject">REJECT</Option>
              <Option value="Pending">PENDING</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default RequestLeave;

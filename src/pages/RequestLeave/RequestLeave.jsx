import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Form, Input, message, DatePicker, Select } from "antd";
import { FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import Search_Input from "../../components/Search_Input/Search_Input";
import FilterInput from "../../components/FilterInput/FilterInput";
import dayjs from "dayjs";
import { getRequestLeave, viewALLByDayRange } from "../../services/api.service";

const { RangePicker } = DatePicker;
const RequestLeave = () => {
  const [requestLeave, setRequestLeave] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRequestData();
  }, [page, size, dateRange]);

  const fetchRequestData = async () => {
    try {
      let res;
      if (dateRange && dateRange.length === 2) {
        const startDate = dateRange[0].format("YYYY-MM-DD");
        const endDate = dateRange[1].format("YYYY-MM-DD");
        res = await viewALLByDayRange(startDate, endDate, page - 1, size);
      } else {
        res = await getRequestLeave(page - 1, size);
      }

      if (res.data && res.data.leaveRequestDTOList) {
        setRequestLeave(res.data.leaveRequestDTOList);
        setTotal(res.data.totalElements);
      } else {
        message.error("Không lấy được dữ liệu nghỉ phép");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Lỗi khi tải dữ liệu");
    }
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    setPage(1);
  };

  const columns = [
    { title: "ID", render: (_, __, index) => index + 1 + (page - 1) * size },
    { title: "Start Date", dataIndex: "startDate" },
    { title: "End Date", dataIndex: "endDate" },
    { title: "Reason", dataIndex: "reason" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "ACCEPTED" ? "green" : status === "REJECTED" ? "red" : "gold"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <button onClick={() => setEditData(record) || setIsModalOpen(true)}>
            <FaPencil size={20} className="text-yellow-500" />
          </button>
          <button onClick={() => console.log(`delete request ${record.id}`)}>
            <IoTrashBin size={20} className="text-red-500" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg w-full">
      <h1 className="text-2xl font-semibold mb-6">Request Leave</h1>
      <div className="flex items-center justify-between mb-6">
        <Search_Input />
        <FilterInput />
        <RangePicker onChange={handleDateChange} />
      </div>

      <Table
        className="rounded-lg border"
        columns={columns}
        dataSource={requestLeave}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: size,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} rows`,
        }}
        onChange={(pagination) => {
          setPage(pagination.current);
          setSize(pagination.pageSize);
        }}
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
              onChange={(e) => setEditData({ ...editData, employee_id: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Manager ID">
            <Input
              value={editData?.manager_id}
              onChange={(e) => setEditData({ ...editData, manager_id: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Start Date">
            <Input
              value={editData?.startDate}
              type="date"
              onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="End Date">
            <Input
              value={editData?.endDate}
              type="date"
              onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Reason">
            <Input
              value={editData?.reason}
              onChange={(e) => setEditData({ ...editData, reason: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Select
              value={editData?.status || "PENDING"}
              onChange={(value) => setEditData((prev) => ({ ...prev, status: value }))}
            >
              <Select.Option value="ACCEPTED">APPROVED</Select.Option>
              <Select.Option value="REJECTED">REJECT</Select.Option>
              <Select.Option value="PENDING">PENDING</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RequestLeave;

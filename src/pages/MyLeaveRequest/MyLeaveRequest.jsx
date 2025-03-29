import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  message,
  DatePicker,
  Select,
  Button,
  Flex,
  notification,
} from "antd";
import { IoPencil, IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import Search_Input from "../../components/Search_Input/Search_Input";
import FilterInput from "../../components/FilterInput/FilterInput";

import {
  getMyLeaveRequest,
  employeeGetRequestById,
  employeeUpdateRequest,
} from "../../services/api.service";
import { FaPencilAlt } from "react-icons/fa";

const { Option } = Select;

import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const MyLeaveRequest = () => {
  const [requestLeave, setRequestLeave] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0);

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [reason, setReason] = useState("");
  // const [status, setStatus] = useState("");

  const [requestSelected, setRequestSelected] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchRequestData();
  }, [page, size, dateRange]);
  const [idRequest, setIdRequest] = useState("");

  const fetchRequestData = async () => {
    try {
      const res = await getMyLeaveRequest();
      if (res.data) {
        setRequestLeave(res.data.leaveRequestDTOList);
        // setTotal(res.data.totalElements);
      }

      console.log(res);
    } catch (error) {
      message.error("No data to response");
    }
  };

  const handleUpdateRequest = async (id) => {
    try {
      const res = await employeeGetRequestById(id);
      const leaveRequest = res.data.leaveRequestDTOList[0];

      setRequestSelected(leaveRequest);
      form.setFieldsValue({
        startDate: dayjs(leaveRequest.startDate),
        endDate: dayjs(leaveRequest.endDate),
        reason: leaveRequest.reason,
        status: leaveRequest.status,
      });

      console.log(leaveRequest);
      setIsModalOpen(true);
    } catch (error) {
      message.error("Failed to fetch request leave data");
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      await employeeUpdateRequest(
        requestSelected.id,
        values.startDate,
        values.endDate,
        values.reason,
        values.status
      );
      message.success("Update successfully");
      setIsModalOpen(false);
      fetchRequestData();
    } catch (error) {
      notification.error({
        message: "Update failed",
        description: error.message,
      });
    }
  };

  const columns = [
    { title: "ID", render: (_, __, index) => index + 1 + (page - 1) * size },
    { title: "Start Date", dataIndex: "startDate" },
    { title: "End Date", dataIndex: "endDate" },
    { title: "Reason", dataIndex: "reason" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "ACCEPTED"
            ? "green"
            : status === "REJECTED"
            ? "red"
            : "gold"; // "PENDING"
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              handleUpdateRequest(record.id);
              setIsModalOpen(true);
            }}
          >
            <FaPencilAlt size={20} className="text-yellow-500" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg w-full">
      <h1 className="text-2xl font-semibold mb-6">Request Leave</h1>
      {/* <div className="flex items-center justify-between mb-6">
        <Search_Input />
        <FilterInput />
        <RangePicker onChange={handleDateChange} />
      </div> */}

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
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} rows`,
        }}
        onChange={(pagination) => {
          setPage(pagination.current);
          setSize(pagination.pageSize);
        }}
      />

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
            label="Start Date"
            name="startDate"
            type="date"
            rules={[{ required: true, message: "Please input start date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            type="date"
            rules={[{ required: true, message: "Please input end date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please input your reason" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your reason" }]}
          >
            <Input disabled={true} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyLeaveRequest;

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
  notification,
} from "antd";
import { FaPencilAlt } from "react-icons/fa";
import dayjs from "dayjs";
import {
  getMyLeaveRequest,
  getMyLeaveRequestByDateRange,
  employeeGetRequestById,
  employeeUpdateRequest,
} from "../../services/api.service";

const { RangePicker } = DatePicker;

const MyLeaveRequest = () => {
  const [requestLeave, setRequestLeave] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [requestSelected, setRequestSelected] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRequestData();
  }, [page, size, dateRange]);

  const fetchRequestData = async () => {
    try {
      let res;
      if (dateRange.length === 2) {
        res = await getMyLeaveRequestByDateRange(
          dateRange[0].format("YYYY-MM-DD"),
          dateRange[1].format("YYYY-MM-DD"),
          page - 1,
          size
        );
      } else {
        res = await getMyLeaveRequest(page - 1, size);
      }

      if (res.data) {
        setRequestLeave(res.data.leaveRequestDTOList);
        setTotal(res.data.totalElements);
      }
    } catch (error) {
      message.error("No data available to display");
    }
  };

  const handleDateChange = (dates) => {
    setDateRange(dates || []);
    setPage(1);
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

      setIsModalOpen(true);
    } catch (error) {
      message.error("Error fetching leave request data");
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
      message.success("Update successful");
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
            : "gold";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleUpdateRequest(record.id)}>
            <FaPencilAlt size={20} className="text-yellow-500" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg w-full">
      <h1 className="text-2xl font-semibold mb-6">Request Leave</h1>
      <RangePicker onChange={handleDateChange} className="mb-4" />

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
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
        onChange={(pagination) => {
          setPage(pagination.current);
          setSize(pagination.pageSize);
        }}
      />

      <Modal
        title="Update Leave Request"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleUpdateSubmit}>
              Save
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please enter a reason" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyLeaveRequest;

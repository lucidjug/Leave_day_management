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
} from "antd";
import { IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import Search_Input from "../../components/Search_Input/Search_Input";
import FilterInput from "../../components/FilterInput/FilterInput";
import Loading from "../../components/Loading/Loading";
import { deleteRequest, getRequestLeave, viewALLByDayRangeManager, getRejectRequest, getAcceptRequest } from "../../services/api.service";

const { Option } = Select;

import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const RequestLeave = () => {
  const [requestLeave, setRequestLeave] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchRequestData();
  }, [page, size, dateRange]);
  const [idRequest, setIdRequest] = useState("");

  const fetchRequestData = async () => {
    try {
      let res;
      if (dateRange && dateRange.length === 2) {
        const startDate = dateRange[0].format("YYYY-MM-DD");
        const endDate = dateRange[1].format("YYYY-MM-DD");
        res = await viewALLByDayRangeManager(
          startDate,
          endDate,
          page - 1,
          size
        );
        res = await viewALLByDayRangeManager(
          startDate,
          endDate,
          page - 1,
          size
        );
      } else {
        res = await getRequestLeave(page - 1, size);
      }

      if (res.data && res.data.leaveRequestDTOList) {
        setRequestLeave(res.data.leaveRequestDTOList);
        setTotal(res.data.totalElements);
      } else {
        message.error("Can not get leave request");
      }
    } catch (error) {
      message.error("No data to response");
    }
  };

  const handleUpdateRequest = (record) => {
    setEditData(record);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
      message.success("Delete request leave successfully");
      fetchRequestData();
    } catch (error) {
      message.error("Delete failed");
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
  const handleAcceptRequest = async () => {
    setLoading(true)
    try {
      if (!editData || !editData.id) {
        message.error("No request selected!");
        return;
      }

      const res = await getAcceptRequest(editData.id);


      if (res.status === 200) {

        setIsModalOpen(false);
        message.success(res.data.message);
        fetchRequestData();
      } else {
        message.error("Failed to approve request!");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      message.error("An error occurred while approving the request!");
    }
    setLoading(false)
  };

  const handleRejectRequest = async () => {
    try {
      if (!editData || !editData.id) {
        message.error("No request selected!");
        return;
      }

      const res = await getRejectRequest(editData.id);


      if (res.status === 200) {
        message.error(res.data.message);
        setIsModalOpen(false);
        fetchRequestData();
      } else {
        message.error("Failed to reject request!");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      message.error("An error occurred while rejecting the request!");
    }
  };

  if (loading) {
    return <Loading />;
  }

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
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} on ${total} rows`,
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
        footer={
          <Flex justify="center" gap={100}>
            <Button
              key="accept"
              type="primary"
              block
              style={{ maxWidth: 100 }}
              onClick={handleAcceptRequest}
            >
              ACCEPT
            </Button>
            <Button
              key="reject"
              type="primary"
              danger
              block
              style={{ maxWidth: 100 }}
              onClick={handleRejectRequest}
            >
              REJECT
            </Button>
          </Flex>
        }
      >
        <p>Are you sure you want to update the status of this request?</p>
      </Modal>
    </div>
  );
};

export default RequestLeave;

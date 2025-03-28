import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Form, Input, message } from "antd";
import { FaPencil } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import Search_Input from "../../components/Search_Input/Search_Input";
import FilterInput from "../../components/FilterInput/FilterInput";
import { Select } from "antd";
import { getRequestLeave } from "../../services/api.service";
const { Option } = Select;

const RequestLeave = () => {
  const [requestLeave, setRequestLeave] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [idRequest, setIdRequest] = useState("");

  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [total, setTotal] = useState(5)

  useEffect(() => {
    fetchRequestData()
  }, [page, size])

  const fetchRequestData = async () => {
    try {
      const res = await getRequestLeave(page - 1, size);
      if (res.data && res.data.leaveRequestDTOList) {
        setRequestLeave(res.data.leaveRequestDTOList);
        setTotal(res.data.totalElements); // Cập nhật tổng số phần tử
      } else {
        message.error("Không lấy được dữ liệu nghỉ phép");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Lỗi khi tải dữ liệu");
    }
  };

  const handleUpdateRequest = (record) => {
    setEditData(record);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (id) => {
    console.log(`delete request ${id}`);
  };

  const columns = [
    {
      title: "ID",
      render: (_, record, index) => {
        return (
          <>
            {(index + 1) + (page - 1) * size}
          </>
        )
      }
    },
    { title: "Start Date", dataIndex: "startDate" },
    { title: "End Date", dataIndex: "endDate" },
    { title: "Reason", dataIndex: "reason" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "ACCEPTED" ? "green" :
            status === "REJECTED" ? "red" :
              "gold"; // "PENDING"
        return <Tag color={color}>{status}</Tag>;
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

  const onChange = (pagination, filters, sorter, extra) => {
    // setCurrent, setPageSize
    // nếu thay đổi trang: current
    console.log(">>>>Check:", pagination)
    if (pagination && pagination.current) {
      if (+pagination.current !== +page) {
        setPage(+pagination.current) // "5" => 5
      }
    }

    // nếu thay đổi tổng số phần tử: pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +size) {
        setSize(+pagination.pageSize) // "5" => 5
      }
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg w-full">
      <h1 className="text-2xl font-semibold mb-6">Request Leave</h1>
      <div className="flex items-center justify-between mb-6">
        <Search_Input />
        <FilterInput />
      </div>

      <Table
        className="rounded-lg border"
        columns={columns}
        dataSource={requestLeave}
        rowKey="id"
        pagination={
          {
            current: page,
            pageSize: size,
            showSizeChanger: true,
            total: total,
            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
          }}
        onChange={onChange}
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
              value={editData?.status || "PENDING"} // Đảm bảo có giá trị mặc định
              onChange={(value) => setEditData(prev => ({ ...prev, status: value }))}
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

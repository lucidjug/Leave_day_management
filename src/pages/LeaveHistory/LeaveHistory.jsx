import React from "react";
import { Space, Table, Tag } from "antd";
import Search_Input from "../../components/Search_Input/Search_Input"
import FilterInput from "../../components/FilterInput/FilterInput"

const columns = [
    {
        title: "employee_id",
        dataIndex: "employee_id",
        key: "employee_id",
    },
    {
        title: "manager_id",
        dataIndex: "manager_id",
        key: "manager_id",
    },
    {
        title: "startDate",
        dataIndex: "startDate",
        key: "startDate",
    },
    {
        title: "endDate",
        dataIndex: "endDate",
        key: "endDate",
    },
    {
        title: "reason",
        dataIndex: "reason",
        key: "reason",
    },
    {
        title: "status",
        key: "status",
        dataIndex: "status",
        render: (status) => {
            let color = "";
            if (status === "Accept") {
                color = "green";
            } else if (status === "Reject") {
                color = "red";
            }
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const RequestLeavedata = [
    {
        id: "1",
        employee_id: "John Brown",
        manager_id: "John Brown",
        startDate: "01/01/2025",
        endDate: "01/01/2025",
        reason: "Sick",
        status: "Accept",
    },
    {
        id: "2",
        employee_id: "John Brown",
        manager_id: "John Brown",
        startDate: "01/01/2025",
        endDate: "01/01/2025",
        reason: "Sick",
        status: "Accept",
    },
    {
        id: "3",
        employee_id: "John Brown",
        manager_id: "John Brown",
        startDate: "01/01/2025",
        endDate: "01/01/2025",
        reason: "Sick",
        status: "Accept",
    },
];
const LeaveHistory = () => {
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
        </div>
    );
}

export default LeaveHistory
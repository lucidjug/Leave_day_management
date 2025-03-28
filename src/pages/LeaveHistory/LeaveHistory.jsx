import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import Search_Input from "../../components/Search_Input/Search_Input"
import FilterInput from "../../components/FilterInput/FilterInput"

const columns = [
    {
        title: "userEmail",
        dataIndex: "userEmail",
        key: "userEmail",
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


const LeaveHistory = () => { 
    const [allRequestLeavedata,setAllRequestLeavedata] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // useEffect(()=>{
    //     const getAllLeaveRequests = async ()=>{
    //         const response = await getRequestLeave()
    //     }
    // },[current, pageSize])
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
                dataSource={allRequestLeavedata}
                rowKey="id"
                pagination={
                  {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    // total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                  }}
                // onChange={onChange}
            />
        </div>
    );
}

export default LeaveHistory
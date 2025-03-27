
import React from 'react'
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Search_Input = () => {
    return (
        <div className="relative w-1/3">
            <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Search"
                className="w-full rounded-lg"
            />
        </div>
    )
}

export default Search_Input
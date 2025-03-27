
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'
import React from 'react'

const FilterInput = () => {
    return (
        <Select defaultValue="Newest" size="large" className="w-40">
            <Option value="Newest">Newest</Option>
            <Option value="Oldest">Oldest</Option>
        </Select>
    )
}

export default FilterInput
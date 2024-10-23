import React from "react";
import { Table, Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CategoryTable = ({ categories, onView, onEdit, onDelete }) => {
  const columns = [
    { title: "CategoryID", dataIndex: "categoryID", key: "categoryID" },
    { title: "TagID", dataIndex: "tagID", key: "tagID" },
    { title: "Category Name", dataIndex: "categoryName", key: "categoryName" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories}
      rowKey="categoryID"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default CategoryTable;

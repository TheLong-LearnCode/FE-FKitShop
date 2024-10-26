import React from "react";
import { Table, Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BlogTable = ({ blogs, onView, onEdit, onDelete, tags }) => {
  const columns = [
    { title: "Blog ID", dataIndex: "blogID", key: "blogID" },
    { title: "Blog Name", dataIndex: "blogName", key: "blogName" },
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "draft" ? "Draft" : "Published"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record)} danger />
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={blogs} rowKey="blogID" pagination={{ pageSize: 5 }} />
  );
};

export default BlogTable;

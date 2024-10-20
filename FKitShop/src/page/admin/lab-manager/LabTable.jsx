import React from "react";
import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const LabTable = ({ labs, onEdit, onDelete, onDownloadPDF }) => {
  const columns = [
    { title: "Lab ID", dataIndex: "labID", key: "labID" },
    { title: "Product ID", dataIndex: "productID", key: "productID" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Level", dataIndex: "level", key: "level" },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "PDF File",
      dataIndex: "fileNamePDF",
      key: "fileNamePDF",
      render: (fileName) => fileName ? (
        <Space>
          <span>{fileName.slice(0, 10) + "..."}</span>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => onDownloadPDF(fileName)}
            size="small"
          >
            {/* Download */}
          </Button>
        </Space>
      ) : 'N/A'
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
            {/* Edit */}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.labID)}
            danger
          >
            {/* Delete */}
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={labs} rowKey="labID" />;
};

export default LabTable;

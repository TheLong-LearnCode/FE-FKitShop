import React from "react";
import { Table, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function SupportTable({
  supports,
  currentPage,
  supportsPerPage,
  handleViewSupportDetails,
  handleUpdateSupportStatus,
  handleDelete,
  onPageChange,
}) {
  const statusOptions = ["pending", "in-progress", "resolved", "closed"];

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * supportsPerPage + index + 1,
    },
    {
      title: "Support ID",
      dataIndex: "supportID",
      key: "supportID",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Support Type",
      dataIndex: "supportType",
      key: "supportType",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.requestDate) - new Date(b.requestDate),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleViewSupportDetails(record)} style={{ marginRight: 8 }}>
            View
          </Button>
          <Dropdown
            overlay={
              <Menu>
                {statusOptions.map((status) => (
                  <Menu.Item
                    key={status}
                    onClick={() => handleUpdateSupportStatus(record, status)}
                    disabled={record.status === status}
                  >
                    {status}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              Set Status <DownOutlined />
            </Button>
          </Dropdown>
          <Button danger onClick={() => handleDelete(record)} disabled={record.status === "closed"} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={supports}
      rowKey="supportID"
      pagination={{
        current: currentPage,
        pageSize: supportsPerPage,
        total: supports.length,
        onChange: onPageChange,
      }}
    />
  );
}

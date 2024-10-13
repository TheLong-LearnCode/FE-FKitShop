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
  const statusOptions = ["received", "approved", "done"];

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * supportsPerPage + index + 1,
    },
    {
      title: "Lab Name",
      dataIndex: "labName",
      key: "labName",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Available Support",
      dataIndex: ["supporting", "countSupport"],
      key: "availableSupport",
    },
    {
      title: "Request Date",
      dataIndex: ["supporting", "postDate"],
      key: "requestDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.supporting.postDate) - new Date(b.supporting.postDate),
    },
    {
      title: "Expected Date",
      dataIndex: ["supporting", "expectedSpDate"],
      key: "expectedDate",
      render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
      sorter: (a, b) => {
        if (!a.supporting.expectedSpDate) return -1;
        if (!b.supporting.expectedSpDate) return 1;
        return new Date(a.supporting.expectedSpDate) - new Date(b.supporting.expectedSpDate);
      },
    },
    {
      title: "Status",
      dataIndex: ["supporting", "status"],
      key: "status",
      render: (status) => statusOptions[status] || 'Unknown',
      sorter: (a, b) => a.supporting.status - b.supporting.status,
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
                {statusOptions.map((status, index) => (
                  <Menu.Item
                    key={status}
                    onClick={() => handleUpdateSupportStatus(record, index)}
                    disabled={record.supporting.status === index}
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
          <Button danger onClick={() => handleDelete(record)} disabled={record.supporting.status === 2} style={{ marginLeft: 8 }}>
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
      rowKey={(record) => record.supporting.supportingID}
      pagination={{
        current: currentPage,
        pageSize: supportsPerPage,
        total: supports.length,
        onChange: onPageChange,
      }}
    />
  );
}

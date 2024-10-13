import React from "react";
import { Table, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function QuestionTable({
  questions,
  currentPage,
  questionsPerPage,
  handleViewQuestionDetails,
  handleUpdateQuestionStatus,
  handleDelete,
  onPageChange,
}) {
  const statusOptions = ["pending", "answered", "closed"];

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * questionsPerPage + index + 1,
    },
    {
      title: "Question ID",
      dataIndex: "questionID",
      key: "questionID",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date Posted",
      dataIndex: "datePosted",
      key: "datePosted",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.datePosted) - new Date(b.datePosted),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => statusOptions[status] || 'Unknown',
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleViewQuestionDetails(record)} style={{ marginRight: 8 }}>
            View
          </Button>
          <Dropdown
            overlay={
              <Menu>
                {statusOptions.map((status, index) => (
                  <Menu.Item
                    key={status}
                    onClick={() => handleUpdateQuestionStatus(record, index)}
                    disabled={record.status === index}
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
          <Button danger onClick={() => handleDelete(record)} disabled={record.status === 2} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={questions}
      rowKey="questionID"
      pagination={{
        current: currentPage,
        pageSize: questionsPerPage,
        total: questions.length,
        onChange: onPageChange,
      }}
    />
  );
}

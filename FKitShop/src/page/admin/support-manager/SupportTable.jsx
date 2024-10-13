import React, { useState } from "react";
import { Table, Button, Dropdown, Menu, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function SupportTable({
  supports,
  currentPage,
  supportsPerPage,
  handleViewSupportDetails,
  handleUpdateSupportStatus,
  handleUpdateSupportDate,
  handleDelete,
  onPageChange,
}) {
  const [datePickerOpen, setDatePickerOpen] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});

  const statusOptions = ["received", "approved", "done"];

  const handleDatePickerOpen = (record, open) => {
    setDatePickerOpen(prev => ({ ...prev, [record.supporting.supportingID]: open }));
  };

  const handleDateChange = (record, date) => {
    handleUpdateSupportDate(record, date);
    setDatePickerOpen(prev => ({ ...prev, [record.supporting.supportingID]: false }));
    setDropdownOpen(prev => ({ ...prev, [record.supporting.supportingID]: false }));
  };

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
            open={dropdownOpen[record.supporting.supportingID]}
            onOpenChange={(open) => setDropdownOpen(prev => ({ ...prev, [record.supporting.supportingID]: open }))}
            overlay={
              <Menu>
                <Menu.SubMenu key="setStatus" title="Set Status">
                  {statusOptions.map((status, index) => (
                    <Menu.Item
                      key={status}
                      onClick={() => {
                        handleUpdateSupportStatus(record, index);
                        setDropdownOpen(prev => ({ ...prev, [record.supporting.supportingID]: false }));
                      }}
                      disabled={record.supporting.status === index}
                    >
                      {status}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
                <Menu.Item key="updateDate" onClick={(e) => e.domEvent.stopPropagation()}>
                  <DatePicker
                    open={datePickerOpen[record.supporting.supportingID]}
                    onOpenChange={(open) => handleDatePickerOpen(record, open)}
                    onChange={(date) => handleDateChange(record, date)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Update Support Date"
                  />
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button>
              Actions <DownOutlined />
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

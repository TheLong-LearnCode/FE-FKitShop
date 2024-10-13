import React from "react";
import { Table, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../util/CurrencyUnit";

export default function OrderTable({
  orders,
  currentPage,
  ordersPerPage,
  handleViewOrderDetails,
  handleUpdateOrderStatus,
  handleDelete,
  onPageChange,
}) {
  const statusOptions = ["pending", "in-progress", "delivering", "delivered", "canceled"];

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * ordersPerPage + index + 1,
    },
    {
      title: "Order ID",
      dataIndex: "ordersID",
      key: "ordersID",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => formatCurrency(price),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
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
          <Button type="primary" onClick={() => handleViewOrderDetails(record)} style={{ marginRight: 8 }}>
            View
          </Button>
          <Dropdown
            overlay={
              <Menu>
                {statusOptions.map((status) => (
                  <Menu.Item
                    key={status}
                    onClick={() => handleUpdateOrderStatus(record, status)}
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
          <Button danger onClick={() => handleDelete(record)} disabled={record.status === "canceled"} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="ordersID"
      pagination={{
        current: currentPage,
        pageSize: ordersPerPage,
        total: orders.length,
        onChange: onPageChange,
      }}
    />
  );
}
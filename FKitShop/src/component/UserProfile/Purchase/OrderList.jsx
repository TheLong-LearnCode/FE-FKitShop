import React from 'react';
import { Table, Button } from 'antd';
import { formatCurrency } from "../../../util/CurrencyUnit";

const OrderList = ({ filteredOrders, showOrderDetails, pageSize }) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: ["orders", "ordersID"],
      key: "ordersID",
    },
    {
      title: "Order Date",
      dataIndex: ["orders", "orderDate"],
      key: "orderDate",
    },
    {
      title: "Paying Method",
      dataIndex: ["orders", "payingMethod"],
      key: "payingMethod",
    },
    {
      title: "Total Price",
      dataIndex: ["orders", "totalPrice"],
      key: "totalPrice",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Status",
      dataIndex: ["orders", "status"],
      key: "status",
      render: (status) => status, // Thêm dòng này để chuyển đổi hiển thị
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => showOrderDetails(record.orders.ordersID)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredOrders}
      rowKey={(record) => record.orders.ordersID}
      pagination={{ pageSize: pageSize }}
    />
  );
};

export default OrderList;

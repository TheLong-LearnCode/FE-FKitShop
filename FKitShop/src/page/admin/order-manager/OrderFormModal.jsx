import React, { useState } from "react";
import { Modal, Button, Table, Row, Col } from "antd";
import { formatCurrency } from "../../../util/CurrencyUnit";
import { getModalHeaderMode } from "../../../util/GetModalHeaderMode";

export default function OrderFormModal({
  mode,
  showModal,
  handleCloseModal,
  selectedOrder,
  selectedOrderDetails,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!selectedOrder) return null;

  const {
    ordersID,
    accountID,
    name,
    province,
    district,
    ward,
    address,
    payingMethod,
    phoneNumber,
    shippingPrice,
    totalPrice,
    status,
    orderDate,
    note,
  } = selectedOrder;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    {
      title: "Order Detail ID",
      dataIndex: "orderDetailsID",
      key: "orderDetailsID",
    },
    {
      title: "Product ID",
      dataIndex: "productID",
      key: "productID",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => formatCurrency(record.price * record.quantity),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Modal
      open={showModal}
      onCancel={handleCloseModal}
      width="50%"
      title={<h4></h4>}
      footer={null}
    >
      <Row gutter={16}>
        <Col span={12}>
          <p><strong>Order ID:</strong> {ordersID}</p>
          <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Payment Method:</strong> {payingMethod}</p>
          <p><strong>Shipping Price:</strong> {formatCurrency(shippingPrice)}</p>
          <p><strong>Total Price:</strong> {formatCurrency(totalPrice)}</p>
          <p><strong>Address:</strong> {`${address}, ${ward}, ${district}, ${province}`}</p>
          <p><strong>Note:</strong> {note}</p>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img src="/img/user.png" alt="Customer Avatar" style={{ width: "100px", height: "100px" }}/>
          </div>
          <p><strong>Customer ID:</strong> {accountID}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Phone Number:</strong> {phoneNumber}</p>
        </Col>
      </Row>

      <h4>Order Details:</h4>
      <Table
        columns={columns}
        dataSource={selectedOrderDetails}
        rowKey="orderDetailsID"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: selectedOrderDetails.length,
          onChange: onPageChange,
        }}
      />
    </Modal>
  );
}

import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function OrderFormModal({
  mode,
  showModal,
  handleCloseModal,
  selectedOrder,
}) {
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
    orderDetails
  } = selectedOrder;

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details: {ordersID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Order Information</h4>
        <p><strong>Order ID:</strong> {ordersID}</p>
        <p><strong>Account ID:</strong> {accountID}</p>
        <p><strong>Customer Name:</strong> {name}</p>
        <p><strong>Address:</strong> {`${address}, ${ward}, ${district}, ${province}`}</p>
        <p><strong>Payment Method:</strong> {payingMethod}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Shipping Price:</strong> {shippingPrice?.toLocaleString()} VND</p>
        <p><strong>Total Price:</strong> {totalPrice?.toLocaleString()} VND</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
        <p><strong>Note:</strong> {note}</p>

        <h4>Product Details</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails?.map((detail, index) => (
              <tr key={detail.orderDetailsID}>
                <td>{index + 1}</td>
                <td>{detail.productID}</td>
                <td>{detail.quantity}</td>
                <td>{detail.price?.toLocaleString()} VND</td>
                <td>{(detail.price * detail.quantity)?.toLocaleString()} VND</td>
                <td>{detail.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

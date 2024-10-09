import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function OrderFormModal({
  showModal,
  handleCloseModal,
  selectedOrder, // Thông tin đơn hàng được chọn để xem
}) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details: {selectedOrder?.orders?.ordersID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder && (
          <>
            <h4>Order Information</h4>
            <p><strong>Order ID:</strong> {selectedOrder.orders.ordersID}</p>
            <p><strong>Customer ID:</strong> {selectedOrder.orders.accountID}</p>
            <p><strong>Address:</strong> {selectedOrder.orders.address}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.orders.payingMethod}</p>
            <p><strong>Phone Number:</strong> {selectedOrder.orders.phoneNumber}</p>
            <p><strong>Shipping Price:</strong> {selectedOrder.orders.shippingPrice}</p>
            <p><strong>Total Price:</strong> {selectedOrder.orders.totalPrice}</p>
            <p><strong>Status:</strong> {selectedOrder.orders.status}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orders.orderDate}</p>

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
                {selectedOrder.orderDetails.map((detail, index) => (
                  <tr key={detail.orderDetailsID}>
                    <td>{index + 1}</td>
                    <td>{detail.productID}</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.price}</td>
                    <td>{(detail.price * detail.quantity).toFixed(2)}</td>
                    <td>{detail.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

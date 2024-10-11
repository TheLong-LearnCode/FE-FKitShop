import React, { useState } from "react";
import { Modal, Button, Table, Row, Col } from "react-bootstrap";
import { formatCurrency } from "../../../util/CurrencyUnit";
import { getModalHeaderMode } from "../../../util/GetModalHeaderMode";
import Pagination from "../../../util/Pagination";

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedOrderDetails.slice(indexOfFirstItem, indexOfLastItem);
  const emptyItems = Array(Math.max(0, itemsPerPage - currentItems.length)).fill(null);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header className={getModalHeaderMode(mode)}>
        <Modal.Title>
          <strong>View Order</strong>
        </Modal.Title>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p><strong>Order ID:</strong> {ordersID}</p>
            <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Payment Method:</strong> {payingMethod}</p>
            <p><strong>Shipping Price:</strong> {formatCurrency(shippingPrice)}</p>
            <p><strong>Total Price:</strong> {formatCurrency(totalPrice)}</p>
            <p><strong>Address:</strong> {`${address}, ${ward}, ${district}, ${province}`}</p>
            <p><strong>Note:</strong> {note}</p>
          </Col>
          <Col md={5}>
            <div className="text-center mb-3">
              <img src={"/img/user.png"} alt="Customer Avatar" style={{ width: "100px", height: "100px" }}/>
            </div>
            <p><strong>Customer ID:</strong> {accountID}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Phone Number:</strong> {phoneNumber}</p>
            
          </Col>
        </Row>

        <h4>Order Details:</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Order Detail ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((detail, index) => (
              <tr key={detail.orderDetailsID}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{detail.orderDetailsID}</td>
                <td>{detail.productID}</td>
                <td>{detail.quantity}</td>
                <td>{formatCurrency(detail.price)}</td>
                <td>{formatCurrency(detail.price * detail.quantity)}</td>
                <td>{detail.status}</td>
              </tr>
            ))}
            {emptyItems.map((_, index) => (
              <tr key={`empty-${index}`}>
                <td colSpan="7">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Pagination
          currentPage={currentPage}
          totalItems={selectedOrderDetails.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Modal.Footer>
    </Modal>
  );
}

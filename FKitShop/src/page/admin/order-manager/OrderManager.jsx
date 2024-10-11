import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { cancelOrder, getAllOrders, getOrdersByAccountID } from "../../../service/orderService";
import OrderTable from "./OrderTable";
import OrderFormModal from "./OrderFormModal";
import { Notification } from "../../../component/UserProfile/UpdateAccount/Notification";
import { getUserByAccountID } from "../../../service/userService";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("list");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const orderDetails = [];
  const [showModal, setShowModal] = useState(false);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await getAllOrders();
      // Check if response.data is an object with orders property
      if (response.data && response.data.orders) {
        setOrders(Object.values(response.data.orders));
      } else if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("Unexpected data structure:", response.data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      Notification("Error fetching orders", "", 4, "error");
    }
  };
  const handleNext = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setSelectedOrderDetails([]);
  };

  const handleViewOrderDetails = (order, orderDetails) => {
    const accID = order.accountID;
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrdersByAccountID(accID);
        const array_Order_OrderDetails = response.data;
        array_Order_OrderDetails.forEach(item => {
          item.orderDetails.forEach(orderDetail => {
            orderDetails.push(orderDetail);
          })
        })
        setSelectedOrderDetails(orderDetails);
        setSelectedOrder(order);
      } catch (error) {
        console.error("Error fetching order details:", error);
        Notification("Error fetching order details", "", 4, "warning");
      }
    };
    fetchOrderDetails();
    setShowModal(true);
  };

  const handleDelete = async (order) => {
    try {
      await cancelOrder(order.ordersID);
      fetchAllOrders(); // Refresh the order list after cancellation
      Notification("Order canceled successfully", "", 4, "success");
    } catch (error) {
      console.error("Error canceling order:", error);
      Notification("Error canceling order", "", 4, "warning");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container fluid>
      <h2 className="my-4">
        <strong>Order:</strong>
      </h2>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end"></Col>
      </Row>

      <OrderTable
        orders={orders}
        orderDetails={orderDetails}
        currentPage={currentPage}
        ordersPerPage={ordersPerPage}
        handleViewOrderDetails={handleViewOrderDetails}
        handleDelete={handleDelete}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onPageChange={handlePageChange}
      />

      <OrderFormModal
        mode={mode}
        orderDetails={orderDetails}
        selectedOrder={selectedOrder}
        selectedOrderDetails={selectedOrderDetails}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
}

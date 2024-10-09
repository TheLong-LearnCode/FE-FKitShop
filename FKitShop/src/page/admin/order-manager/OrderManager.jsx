import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import {
  getAllAccounts,
  getOrdersByAccountID,
} from "../../../service/crudUser";
import AccountTable from "./OrderTable";
import AccountFormModal from "./OrderFormModal";
import { Notification } from "../../../component/UserProfile/UpdateAccount/Notification";
import { cancelOrder } from "../../../service/crudOrder"; // Thêm phương thức gọi API cancel order

export default function OrderManager() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]); // List of admin accounts for dropdown
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("list"); // 'list', 'add', 'view', 'edit'
  const [selectedUser, setSelectedUser] = useState(null); // To store selected user data for view/edit
  const [showModal, setShowModal] = useState(false); // Control modal visibility for form
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Control modal visibility for delete
  const [userToDelete, setUserToDelete] = useState(null); // Store user to be deleted
  const usersPerPage = 5;

  useEffect(() => {
    const fetchAllOrdersByAccounts = async () => {
      try {
        const response = await getAllAccounts();
        const users = response.data;

        const ordersPromises = users.map((user) =>
          getOrdersByAccountID(user.accountID)
        );
        const ordersResults = await Promise.all(ordersPromises);

        const allOrders = users.map((user, index) => ({
          ...user,
          orders: ordersResults[index].data,
        }));

        setUsers(allOrders); // Save to state for displaying in table
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllOrdersByAccounts();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setMode("view");
    setShowModal(true);
  };

  const handleDelete = async (order) => {
    try {
      // Gọi API hủy đơn hàng
      await cancelOrder(order.ordersID);

      // Cập nhật lại danh sách order
      const updatedUsers = users.map((user) => {
        return {
          ...user,
          orders: user.orders.map((o) =>
            o.ordersID === order.ordersID
              ? { ...o, status: "Canceled" } // Cập nhật trạng thái order thành "Canceled"
              : o
          ),
        };
      });

      setUsers(updatedUsers);
      Notification("Order canceled successfully", "", 4, "success");
    } catch (error) {
      console.error("Error canceling order:", error);
      Notification("Error canceling order", "", 4, "warning");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMode("list");
  };

  return (
    <Container fluid>
      <h2 className="my-4">
        <strong>Order:</strong>
      </h2>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end"></Col>
      </Row>

      <AccountTable
        users={users}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        handleView={handleView}
        handleDelete={handleDelete} // Thêm handleDelete
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />

      <AccountFormModal
        mode={mode}
        selectedUser={selectedUser}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
}

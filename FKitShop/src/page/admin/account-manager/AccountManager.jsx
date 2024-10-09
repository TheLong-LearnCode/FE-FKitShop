import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "boxicons";
import {
  createAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
} from "../../../service/crudUser";
import AccountTable from "./AccountTable";
import AccountFormModal from "./AccountFormModal";
import { Notification } from "../../../component/UserProfile/UpdateAccount/Notification";

export default function AccountManager() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("list"); // 'list', 'add', 'view', 'edit'
  const [selectedUser, setSelectedUser] = useState(null); // To store selected user data for view/edit
  const [showModal, setShowModal] = useState(false); // Control modal visibility for form
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Control modal visibility for delete
  const [userToDelete, setUserToDelete] = useState(null); // Store user to be deleted
  const usersPerPage = 5;

  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const response = await getAllAccounts();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchAllAccounts();
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

  const handleAddNew = () => {
    setSelectedUser(null); // Clear selected user for new addition
    setMode("add");
    setShowModal(true); // Show modal
  };

  const handleView = (user) => {
    setSelectedUser(user); // Set user for viewing
    setMode("view");
    setShowModal(true); // Show modal
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set user for editing
    setMode("edit");
    setShowModal(true); // Show modal
  };

  // Hàm này sẽ mở modal xác nhận xóa
  const handleDelete = (user) => {
    setUserToDelete(user); // Lưu thông tin user cần xóa
    setShowDeleteModal(true); // Hiển thị modal xác nhận
  };

  // Xử lý xóa sau khi người dùng xác nhận
  const confirmDelete = async () => {
    try {
      const response = await deleteAccount(userToDelete.accountID); // Gọi API xóa
      Notification(response.message, '', 4, "info");
      // Cập nhật lại danh sách người dùng
      const updatedUsers = users.filter(user => user.accountID !== userToDelete.accountID);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
      Notification(response.message, '', 4, "warning");
    } finally {
      setShowDeleteModal(false); // Đóng modal sau khi xóa
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMode("list"); // Go back to list view
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false); // Đóng modal xác nhận xóa
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn việc reload lại trang khi submit form

    const formData = {
      fullName: e.target.formFullName.value,
      email: e.target.formEmail.value,
      password: e.target.formPassword.value,
      dob: e.target.formDateOfBirth.value,
      phoneNumber: e.target.formPhonenumber.value,
      role: e.target.formRole.value,
      status: e.target.formStatus.value,
    };

    try {
      if (mode === "add") {
        const response = await createAccount(formData);
        Notification(response.message, '', 4, "success");
      } else if (mode === "edit") {
        const response = await updateAccount(formData, selectedUser.accountID);
        Notification(response.message, '', 4, "success");
      }
      setShowModal(false); // Close modal after success
      setMode("list");
      // Fetch lại danh sách người dùng sau khi thêm/sửa
      const response = await getAllAccounts();
      setUsers(response.data);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user");
    }
  };

  return (
    <Container fluid>
      <h2 className="my-4">
        <strong>List Users:</strong>
      </h2>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <Button variant="success" className="mr-1">
            <box-icon name="export"></box-icon> Export
          </Button>
          <Button variant="info" onClick={handleAddNew}>
            <box-icon name="plus"></box-icon> Add New
          </Button>
        </Col>
      </Row>

      <AccountTable
        users={users}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />

      <AccountFormModal
        mode={mode}
        selectedUser={selectedUser}
        showModal={showModal}
        showDeleteModal={showDeleteModal} // Trạng thái hiển thị modal xóa
        handleCloseModal={handleCloseModal}
        handleCloseDeleteModal={handleCloseDeleteModal} // Đóng modal xóa
        handleSubmit={handleSubmit}
        handleConfirmDelete={confirmDelete} // Xử lý xóa
      />
    </Container>
  );
}

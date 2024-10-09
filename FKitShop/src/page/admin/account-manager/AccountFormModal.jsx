import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AccountFormModal({
  mode,
  selectedUser,
  showModal,
  showDeleteModal, // Trạng thái hiển thị modal xóa
  handleCloseModal,
  handleCloseDeleteModal, // Đóng modal xóa
  handleSubmit,
  handleConfirmDelete, // Xử lý xác nhận xóa
}) {
  return (
    <>
      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header>
          <Modal.Title>
            {mode === "view"
              ? `Viewing User: ${selectedUser?.fullName}`
              : mode === "edit"
              ? `Editing User: ${selectedUser?.fullName}`
              : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formID">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.accountID}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.fullName}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.password}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                defaultValue={selectedUser?.dob}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formPhonenumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.phoneNumber}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={selectedUser?.email}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.role}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="int"
                defaultValue={selectedUser?.status}
                readOnly={mode === "view"}
              />
            </Form.Group>
            {mode !== "view" && (
              <Button variant="primary" type="submit">
                {mode === "add" ? "Create" : "Update"}
              </Button>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Delete */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header>
          <Modal.Title>Delete Account Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

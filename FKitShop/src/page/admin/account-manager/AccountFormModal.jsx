import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AccountFormModal({
  mode,
  selectedUser,
  admins,
  showModal,
  showDeleteModal,
  showActivateModal, // Trạng thái hiển thị modal xóa
  handleCloseModal,
  handleCloseDeleteModal, // Đóng modal xóa
  handleCloseActivateModal,
  handleSubmit,
  handleConfirmDelete,
  handleConfirmActivate,
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
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
            <Form.Group controlId="formAdminID">
              <Form.Label>Admin ID</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedUser?.adminID ?? ""}
              >
                <option value="">Select Admin</option>
                {admins.map((admin) => (
                  <option key={admin.accountID} value={admin.accountID}>
                    {admin.fullName} ({admin.email})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.fullName}
                readOnly={mode === "view"}
              />
            </Form.Group>
            {mode !== "view" && mode !== "edit" && (
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser?.password}
                  readOnly={mode === "view"}
                />
              </Form.Group>
            )}
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
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                defaultValue={selectedUser?.image}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedUser?.role ?? "user"} // Mặc định chọn "user" nếu không có giá trị
                readOnly={mode === "view"} // Không cho phép chỉnh sửa khi ở chế độ "view"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedUser?.status ?? 0} // Mặc định chọn giá trị 0 nếu không có giá trị
                readOnly={mode === "view"} // Không cho phép chỉnh sửa khi ở chế độ "view"
              >
                <option value={0}>Inactive</option>
                <option value={1}>Active</option>
                <option value={2}>Banned</option>
              </Form.Control>
            </Form.Group>
            {mode !== "view" && (
              <Button variant="primary" type="submit">
                {mode === "add" ? "Create" : "Update"}
              </Button>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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

      <Modal show={showActivateModal} onHide={handleCloseActivateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Activate Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to activate this account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseActivateModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmActivate}>
            Activate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

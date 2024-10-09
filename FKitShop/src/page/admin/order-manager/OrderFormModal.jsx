import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function OrderFormModal({
  currentPage,
  usersPerPage,
  mode,
  selectedUser,
  admins,
  showModal,
  showDeleteModal, // Trạng thái hiển thị modal xóa
  handleCloseModal,
  handleCloseDeleteModal, // Đóng modal xóa
  handleSubmit,
  handleConfirmDelete, // Xử lý xác nhận xóa
}) {
  const [sortColumn, setSortColumn] = useState("fullName"); // Cột đang được sắp xếp
  const [sortOrder, setSortOrder] = useState("asc"); // Thứ tự sắp xếp ('asc' hoặc 'desc')

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Hàm xử lý việc sắp xếp
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  // Hàm sắp xếp theo cột và thứ tự
  // const sortedUsers = [...users].sort((a, b) => {
  const sortedUsers = [null].sort((a, b) => {
    let aValue = a[sortColumn]?.toLowerCase() || ""; // Giả sử `fullName` và `email` đều là chuỗi
    let bValue = b[sortColumn]?.toLowerCase() || "";

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      {/* VIEW: OrderID CustomerID/Name OrderDate Address PaymentMethod OrderStatus PRODUCT INFORMATION */}
      {/* PRODUCT: NO PRODUCTID PRODUCTNAME quantity(*) price(*) totalprice --total amount-- */}

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
            <Form.Group controlId="formOrderID">
              <Form.Label>Order ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.ordersId}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formCustomerID">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.accountID}
                readOnly
              />
            </Form.Group>
            {/* <Form.Group controlId="formAdminID">
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
            </Form.Group> */}
            <Form.Group controlId="formFullName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.fullName}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formOrderDate">
              <Form.Label>Order Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={selectedUser?.orderDate}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.address}
                readOnly={mode === "view"}
              />
            </Form.Group>
            <Form.Group controlId="formPaymentMethod">
              <Form.Label>PaymentMethod</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.payingMethod}
                readOnly={mode === "view"}
              />
            </Form.Group>

            <Form.Group controlId="formOrderStatus">
              <Form.Label>OrderStatus</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedUser?.status ?? 0} // Mặc định chọn giá trị 0 nếu không có giá trị
                readOnly={mode === "view"} // Không cho phép chỉnh sửa khi ở chế độ "view"
              >
                <option value={"Not Yet"}>Not Yet</option>
                <option value={"On-going"}>On-going</option>
                <option value={"Done"}>Done</option>
                <option value={"Canceled"}>Canceled</option>
              </Form.Control>
            </Form.Group>

            {/* PRODUCT INFORMATION */}
            <h3>Product Information</h3>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: "var(--forth-color)" }}>
                <tr>
                  <th>No</th>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th
                    onClick={() => handleSort("fullName")}
                    style={{ cursor: "pointer" }}
                  >
                    Total Price{" "}
                    {sortColumn === "fullName" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    style={{ cursor: "pointer" }}
                  >
                    Order Date{" "}
                    {sortColumn === "email" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user?.ordersID}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{user?.accountID}</td>
                    <td>{user?.totalPrice}</td>
                    <td>{user?.orderDate}</td>
                    <td>{user?.status}</td>
                    <td>
                      {/* {user.status === 0
                  ? "Inactive"
                  : user.status === 1
                  ? "Active"
                  : user.status === 2
                  ? "Banned"
                  : "Unknown"} */}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        className="mr-1"
                        onClick={() => handleView(user)}
                      >
                        View
                      </Button>
                      {/* <Button
                  variant="warning"
                  className="mr-1"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button> */}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* --------------------------------------------------------------------------------------------- */}

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

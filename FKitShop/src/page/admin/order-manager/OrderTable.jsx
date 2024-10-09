import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function OrderTable({
  users,
  currentPage,
  usersPerPage,
  handleView,
  handleDelete, // Nhận handleDelete từ props
  handlePrevious,
  handleNext,
}) {
  const [sortColumn, setSortColumn] = useState("fullName");
  const [sortOrder, setSortOrder] = useState("asc");

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortColumn]?.toLowerCase() || "";
    let bValue = b[sortColumn]?.toLowerCase() || "";
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: "var(--forth-color)" }}>
          <tr>
            <th>No</th>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th
              onClick={() => handleSort("totalPrice")}
              style={{ cursor: "pointer" }}
            >
              Total Price{" "}
              {sortColumn === "totalPrice" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("orderDate")}
              style={{ cursor: "pointer" }}
            >
              Order Date{" "}
              {sortColumn === "orderDate" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("status")}
              style={{ cursor: "pointer" }}
            >
              Status{" "}
              {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) =>
            user.orders.map((order, idx) => (
              <tr key={order.ordersID}>
                <td>{index * usersPerPage + idx + 1}</td>
                <td>{order.ordersID}</td>
                <td>{user.accountID}</td>
                <td>{order.totalPrice}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>
                  <Button variant="primary" onClick={() => handleView(order)}>
                    View
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(order)}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={indexOfLastUser >= users.length}>
          Next
        </Button>
      </div>
    </>
  );
}

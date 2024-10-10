import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function OrderTable({
  orders,
  currentPage,
  ordersPerPage,
  handleViewOrder,
  handleDelete,
  handlePrevious,
  handleNext,
}) {
  const [sortColumn, setSortColumn] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedOrders = Array.isArray(orders) 
    ? [...orders].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (sortColumn === "orderDate") {
          return sortOrder === "asc"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }
        return sortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      })
    : [];

  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  if (!Array.isArray(orders) || orders.length === 0) {
    return <p>No orders available.</p>;
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: "var(--forth-color)" }}>
          <tr>
            <th>No</th>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th onClick={() => handleSort("totalPrice")} style={{ cursor: "pointer" }}>
              Total Price {sortColumn === "totalPrice" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("orderDate")} style={{ cursor: "pointer" }}>
              Order Date {sortColumn === "orderDate" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
              Status {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={order.ordersID}>
              <td>{indexOfFirstOrder + index + 1}</td>
              <td>{order.ordersID}</td>
              <td>{order.accountID}</td>
              <td>{order.totalPrice}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewOrder(order)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(order)}
                  disabled={order.status === "Canceled"}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={indexOfLastOrder >= orders.length}>
          Next
        </Button>
      </div>
    </>
  );
}

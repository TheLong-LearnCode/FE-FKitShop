import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { formatCurrency } from "../../../util/CurrencyUnit";
import Pagination from "../../../util/Pagination";

export default function OrderTable({
  orders,
  orderDetails,
  currentPage,
  ordersPerPage,
  handleViewOrderDetails,
  handleDelete,
  onPageChange,
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

  // Tạo một mảng các item trống để điền vào trang cuối cùng nếu cần
  const emptyItems = Array(Math.max(0, ordersPerPage - currentOrders.length)).fill(null);

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
            <th>Customer Name</th>
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
          {currentOrders.map((order, index) => (
            <tr key={order.ordersID}>
              <td>{indexOfFirstOrder + index + 1}</td>
              <td>{order.ordersID}</td>
              <td>{order.name}</td>
              <td>{formatCurrency(order.totalPrice)}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>
                <Button
                  variant="outline-info"
                  onClick={() => handleViewOrderDetails(order, orderDetails)}
                  className="mr-1"
                >
                  View
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(order)}
                  disabled={order.status === "Canceled"}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
          {emptyItems.map((_, index) => (
            <tr key={`empty-${index}`}>
              <td colSpan="7">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalItems={orders.length}
        itemsPerPage={ordersPerPage}
        onPageChange={onPageChange}
      />
    </>
  );
}

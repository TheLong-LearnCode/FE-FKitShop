import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function AccountTable({
  users,
  currentPage,
  usersPerPage,
  handleView,
  handleEdit,
  handleDelete,
  handleActivate,
  handlePrevious,
  handleNext,
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
  const sortedUsers = [...users].sort((a, b) => {
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
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: "var(--forth-color)" }}>
          <tr>
            <th>No</th>
            <th
              onClick={() => handleSort("fullName")}
              style={{ cursor: "pointer" }}
            >
              Full Name{" "}
              {sortColumn === "fullName" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("email")}
              style={{ cursor: "pointer" }}
            >
              Email{" "}
              {sortColumn === "email" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.status === 0
                  ? "Inactive"
                  : user.status === 1
                  ? "Active"
                  : user.status === 2
                  ? "Banned"
                  : "Unknown"}
              </td>
              <td>
                <Button
                  variant="primary"
                  className="mr-1"
                  onClick={() => handleView(user)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  className="mr-1"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
                {user.status === 1 ? (
                  <Button variant="danger" onClick={() => handleDelete(user)}>
                    Delete
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleActivate(user)}
                  >
                    Activate
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="mr-1"
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={currentPage >= Math.ceil(users.length / usersPerPage)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

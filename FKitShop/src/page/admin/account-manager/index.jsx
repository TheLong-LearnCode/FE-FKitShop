import React, { useEffect, useState } from 'react';
import { Table, Container, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';
import 'boxicons';
import { getAllAccounts } from '../../../service/crudUser';

export default function AccountManager() {
    const [users, setUsers] = useState([]); // Ensure initial state is an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Number of users per page
    const [sortColumn, setSortColumn] = useState('fullName'); // Default sort column
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

    useEffect(() => {
        const fetchAllAccounts = async () => {
            try {
                const response = await getAllAccounts();
                setUsers(response.data); // Ensure response.data is an array of users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAllAccounts();
    }, []); // Only run once when the component mounts

    const handleSort = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    const sortedUsers = [...users].sort((a, b) => {
        const aValue = sortColumn === 'fullName' ? a.fullName.toLowerCase() : a.id;
        const bValue = sortColumn === 'fullName' ? b.fullName.toLowerCase() : b.id;

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // Calculate the indices of users for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser); // Apply sorting

    // Pagination
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

    return (
        <Container fluid>
            <h2 className="my-4"><strong>List Users:</strong></h2>
            <InputGroup className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search user by email..."
                />
            </InputGroup>
            <Row className="mb-3">
                <Col className="d-flex justify-content-end">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="success" className="mr-1">
                            <box-icon name='export'></box-icon> Export
                        </Button>
                        <Button variant="info" className="mr-1">
                            <box-icon name='plus'></box-icon> Add New
                        </Button>
                    </div>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th> {/* No sorting for this column */}
                        <th></th>
                        <th onClick={() => handleSort('fullName')}>
                            Full Name
                            <span className={`sort-arrow ${sortColumn === 'fullName' ? sortOrder : ''}`}>
                                {sortColumn === 'fullName' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
                            </span>
                        </th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{user.image}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <Button variant="primary" className="mr-1">View</Button>
                                <Button variant="warning" className="mr-1">Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1} className='mr-1'>Previous</Button>
                <Button variant="secondary" onClick={handleNext} disabled={currentPage >= Math.ceil(users.length / usersPerPage)}>Next</Button>
            </div>
        </Container>
    );
}

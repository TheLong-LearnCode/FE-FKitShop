// import React, { useEffect, useState } from 'react';
// import { Table, Container, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';
// import 'boxicons';
// import { getAllAccounts } from '../../../service/crudUser';

// export default function AccountManager() {
//     const [users, setUsers] = useState([]); // Ensure initial state is an empty array
//     const [currentPage, setCurrentPage] = useState(1);
//     const usersPerPage = 5; // Number of users per page
//     const [sortColumn, setSortColumn] = useState('fullName'); // Default sort column
//     const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

//     useEffect(() => {
//         const fetchAllAccounts = async () => {
//             try {
//                 const response = await getAllAccounts();
//                 setUsers(response.data); // Ensure response.data is an array of users
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchAllAccounts();
//     }, []); // Only run once when the component mounts

//     const handleSort = (column) => {
//         const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
//         setSortColumn(column);
//         setSortOrder(newSortOrder);
//     };

//     const sortedUsers = [...users].sort((a, b) => {
//         const aValue = sortColumn === 'fullName' ? a.fullName.toLowerCase() : a.id;
//         const bValue = sortColumn === 'fullName' ? b.fullName.toLowerCase() : b.id;

//         if (sortOrder === 'asc') {
//             return aValue > bValue ? 1 : -1;
//         } else {
//             return aValue < bValue ? 1 : -1;
//         }
//     });

//     // Calculate the indices of users for the current page
//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser); // Apply sorting

//     // Pagination
//     const handleNext = () => {
//         if (currentPage < Math.ceil(users.length / usersPerPage)) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <Container fluid>
//             <h2 className="my-4"><strong>List Users:</strong></h2>
//             <InputGroup className="mb-4">
//                 <Form.Control
//                     type="text"
//                     placeholder="Search user by email..."
//                 />
//             </InputGroup>
//             <Row className="mb-3">
//                 <Col className="d-flex justify-content-end">
//                     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                         <Button variant="success" className="mr-1">
//                             <box-icon name='export'></box-icon> Export
//                         </Button>
//                         <Button variant="info" className="mr-1">
//                             <box-icon name='plus'></box-icon> Add New
//                         </Button>
//                     </div>
//                 </Col>
//             </Row>
//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr>
//                         <th>No</th> {/* No sorting for this column */}
//                         <th></th>
//                         <th onClick={() => handleSort('fullName')}>
//                             Full Name
//                             <span className={`sort-arrow ${sortColumn === 'fullName' ? sortOrder : ''}`}>
//                                 {sortColumn === 'fullName' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
//                             </span>
//                         </th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentUsers.map((user, index) => (
//                         <tr key={user.id}>
//                             <td>{indexOfFirstUser + index + 1}</td>
//                             <td>{user.image}</td>
//                             <td>{user.fullName}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td>{user.status}</td>
//                             <td>
//                                 <Button variant="primary" className="mr-1">View</Button>
//                                 <Button variant="warning" className="mr-1">Edit</Button>
//                                 <Button variant="danger">Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <div className="d-flex justify-content-end">
//                 <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1} className='mr-1'>Previous</Button>
//                 <Button variant="secondary" onClick={handleNext} disabled={currentPage >= Math.ceil(users.length / usersPerPage)}>Next</Button>
//             </div>
//         </Container>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Table, Row, Col } from 'react-bootstrap';
import 'boxicons';
import { createAccount, getAllAccounts, updateAccount } from '../../../service/crudUser';

export default function AccountManager() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mode, setMode] = useState('list'); // 'list', 'add', 'view', 'edit'
    const [selectedUser, setSelectedUser] = useState(null); // To store selected user data for view/edit
    const usersPerPage = 5;
    const [sortColumn, setSortColumn] = useState('fullName');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchAllAccounts = async () => {
            try {
                const response = await getAllAccounts();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchAllAccounts();
    }, []);

    const handleSort = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

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

    const sortedUsers = [...users].sort((a, b) => {
        const aValue = sortColumn === 'fullName' ? a.fullName.toLowerCase() : a.id;
        const bValue = sortColumn === 'fullName' ? b.fullName.toLowerCase() : b.id;
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleAddNew = () => {
        setSelectedUser(null); // Clear selected user for new addition
        setMode('add');
    };

    const handleView = (user) => {
        setSelectedUser(user); // Set user for viewing
        setMode('view');
    };

    const handleEdit = (user) => {
        setSelectedUser(user); // Set user for editing
        setMode('edit');
    };

    const handleBack = () => {
        setMode('list'); // Go back to list view
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
        console.log("formData: " + formData);
        
        try {
            if (mode === 'add') {
                // Gọi API tạo tài khoản mới
                await createAccount(formData);
                alert('User created successfully!');
            } else if (mode === 'edit') {
                // Gọi API cập nhật tài khoản
                await updateAccount(selectedUser.id, formData);
                alert('User updated successfully!');
            }
            setMode('list'); // Quay lại chế độ danh sách sau khi thành công
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Error saving user');
        }
    };

    return (
        <Container fluid>
            {mode === 'list' && (
                <>
                    <h2 className="my-4"><strong>List Users:</strong></h2>
                    <Row className="mb-3">
                        <Col className="d-flex justify-content-end">
                            <Button variant="success" className="mr-1">
                                <box-icon name='export'></box-icon> Export
                            </Button>
                            <Button variant="info" onClick={handleAddNew}>
                                <box-icon name='plus'></box-icon> Add New
                            </Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
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
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Button variant="primary" className="mr-1" onClick={() => handleView(user)}>View</Button>
                                        <Button variant="warning" className="mr-1" onClick={() => handleEdit(user)}>Edit</Button>
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
                </>
            )}

            {(mode === 'view' || mode === 'edit' || mode === 'add') && (
                <div className="user-form">
                    <h2 className="my-4 d-flex justify-content-between">
                        <span>{mode === 'view' ? `Viewing User: ${selectedUser?.fullName}` : mode === 'edit' ? `Editing User: ${selectedUser?.fullName}` : 'Add New User'}</span>
                        <Button variant="secondary" onClick={handleBack}>Back</Button>
                    </h2>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formID">
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={selectedUser?.accountID}
                                readOnly={mode === 'view' && mode === 'edit'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={selectedUser?.fullName}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={selectedUser?.password}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={selectedUser?.dob}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhonenumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={selectedUser?.phoneNumber}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={selectedUser?.email}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCreateDate">
                            <Form.Label>Create Date</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={selectedUser?.createDate}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                defaultValue={selectedUser?.image}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={selectedUser?.role}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="int"
                                defaultValue={selectedUser?.status}
                                readOnly={mode === 'view'}
                            />
                        </Form.Group>
                        {mode !== 'view' && (
                            <Button variant="primary" type="submit">
                                {mode === 'add' ? 'Create' : 'Save Changes'}
                            </Button>
                        )}

                    </Form>
                </div>
            )}
        </Container>
    );
}


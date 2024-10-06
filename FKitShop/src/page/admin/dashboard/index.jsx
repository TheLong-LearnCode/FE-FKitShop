import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/authSlice';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, InputGroup, Nav } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

export default function Dashboard() {
  // Lấy dữ liệu
  const data = useSelector((state) => state.auth);
  // Action
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Data in dashboard: ", data); // data.data => lấy ra info của admin

  const handleLogout = () => {
    dispatch(logout());
    // Chuyển hướng về trang login
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Menu */}
      <div className="d-flex">
        <Nav className="flex-column bg-light p-3 vh-100" style={{ width: '250px' }}>
          <div className="mb-4">
            <Nav.Link href="#" className="text-muted">Logo</Nav.Link>
          </div>
          <div className="mb-4">
            <span className="text-muted">Tên của bạn</span>
          </div>
          <Nav.Link href="/dashboard" className="active">Dashboard</Nav.Link>
          <Nav.Link href="/account">Account</Nav.Link>
          <Nav.Link href="/product">Product</Nav.Link>
          <Nav.Link href="/delivery">Delivery</Nav.Link>
          <Nav.Link href="/order">Order</Nav.Link>
          <div className="mt-auto">
            <Nav.Link href="#" className="text-muted">Lab Support</Nav.Link>
          </div>
        </Nav>

        {/* Main content */}
        <div className="w-100">
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center p-3 bg-light">
            <InputGroup className="w-50">
              <InputGroup.Text>
                <i className="fas fa-search"></i>
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search for..." />
            </InputGroup>
            <div className="d-flex align-items-center">
              <i className="fas fa-bell mr-3"></i>
              <i className="fas fa-user" onClick={handleLogout}></i>
            </div>
          </header>

          {/* Main content layout */}
          <Container fluid className="p-4">
            <Row>
              <Col sm={4} className="mb-3">
                <div className="bg-secondary p-5 text-center">Thông số</div>
              </Col>
              <Col sm={4} className="mb-3">
                <div className="bg-secondary p-5 text-center">Thông số</div>
              </Col>
              <Col sm={4} className="mb-3">
                <div className="bg-secondary p-5 text-center">Thông số</div>
              </Col>
            </Row>
            <Row>
              <Col sm={8} className="mb-3">
                <div className="bg-secondary p-5 text-center">Biểu đồ cột/hàng</div>
              </Col>
              <Col sm={4} className="mb-3">
                <div className="bg-secondary p-5 text-center">Biểu đồ tròn</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

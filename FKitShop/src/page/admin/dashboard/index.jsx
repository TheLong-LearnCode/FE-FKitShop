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
  const admin = useSelector((state) => state.auth.data);
  // Action


  console.log("Data in dashboard: ", data); // data.data => lấy ra info của admin
  console.log("Admin in dashboard: ", admin); // data.data => lấy ra info của admin

  return (
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
        <Col sm={8} className="mb-3 h-3000">
          <div className="bg-secondary p-5 text-center vh-90">Biểu đồ cột/hàng</div>
        </Col>
        <Col sm={4} className="mb-3 h-3000">
          <div className="bg-secondary p-5 text-center vh-90">Biểu đồ tròn</div>
        </Col>
      </Row>
    </Container>
  );
}

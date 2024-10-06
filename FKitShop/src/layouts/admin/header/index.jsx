import React, { startTransition } from 'react'
import { Container, Row, Col, Form, InputGroup, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome
import { logout } from '../../../redux/slices/authSlice';
import { message } from 'antd';
export default function HeaderLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    startTransition(() => {
    dispatch(logout());
    message.success('Log out successfully!'); // Hiển thị thông báo đăng xuất thành công
    navigate("/");
    });
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light">
      {/* Search Bar */}
      <InputGroup className="w-50" style={{ marginTop: '22px' }}>
        <InputGroup.Text>
          <i className="fas fa-search"></i>
        </InputGroup.Text>
        <Form.Control type="text" placeholder="Search for..." />
      </InputGroup>

      {/* Notification & User Icon */}
      <div className="d-flex align-items-center">
        <i className="fas fa-bell mr-3"></i>
        <i className="fas fa-user" onClick={handleLogout}></i>
      </div>
    </header>
  )
}

import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../src/assets/images/Logo.png';

export default function MenuLayout() {
  const navigate = useNavigate(); // Sử dụng hook để điều hướng

  const handleNavigation = (path) => {
    navigate(path); // Chuyển hướng đến đường dẫn mới
  };

  return (
    <Nav className="flex-column bg-light p-3 vh-100" style={{ width: '250px' }}>
      {/* Logo */}
      <div className="mb-4">
        <Nav.Link href="/admin" className="text-muted">
          <img src={logo} alt="Logo" style={{ width: 'auto', height: '60px' }} />
        </Nav.Link>
      </div>
      <div className="mb-4">
        <span className="text-muted">Tên của bạn</span>
      </div>
      <Nav.Link onClick={() => handleNavigation('/admin/dashboard')} className="active">Dashboard</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/admin/account-manager')}>Account</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/admin/category-manager')}>Category</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/admin/product-manager')}>Product</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/admin/delivery-manager')}>Delivery</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/admin/order-manager')}>Order</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/admin/lab-manager')}>Lab Support</Nav.Link>
      <Nav.Link onClick={() => handleNavigation('/admin/labGuide-manager')}>Lab Guide Support</Nav.Link>
    </Nav>
  );
}

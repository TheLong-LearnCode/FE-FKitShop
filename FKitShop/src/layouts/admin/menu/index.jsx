// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import logo from '../../../../src/assets/images/Logo.png';
// import 'boxicons'
// import './index.css'

// export default function MenuLayout() {
//   const navigate = useNavigate(); // Sử dụng hook để điều hướng

//   const handleNavigation = (path) => {
//     navigate(path); // Chuyển hướng đến đường dẫn mới
//   };

//   return (
//     <Nav className="d-flex flex-column bg-light p-4 nav-container">
//       {/* Logo */}
//       <div className="mb-4">
//         <Nav.Link href="/admin" className="text-muted">
//           <img src={logo} alt="Logo" style={{ width: 'auto', height: '80px' }} />
//         </Nav.Link>
//       </div>
//       {/* <div className="mb-4">
//         <span className="text-muted">Tên của bạn</span>
//       </div> */}

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/dashboard')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-dashboard-57.png" alt="Account" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Dashboard</strong></span>
//         </span>
//       </Nav.Link>

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/account-manager')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-account-57.png" alt="Account" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Accounts</strong></span>
//         </span>
//       </Nav.Link>

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/category-manager')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-category-57.png" alt="Category" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Category</strong></span>
//         </span>
//       </Nav.Link>

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/product-manager')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-product-57.png" alt="Product" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Product</strong></span>
//         </span>
//       </Nav.Link>

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/delivery-manager')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-delivery-57.png" alt="Delivery" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Delivery</strong></span>
//         </span>
//       </Nav.Link>

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/order-manager')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-order-57.png" alt="Order" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Order</strong></span>
//         </span>
//       </Nav.Link>

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/lab-manager')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-labsupport-57.png" alt="LabSupport" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Lab Support</strong></span>
//         </span>
//       </Nav.Link>

//       <Nav.Link
//         onClick={() => handleNavigation('/admin/feedback-manager')}
//         className="d-flex align-items-center nav-link-item"
//       >
//         <span className="d-flex align-items-center">
//           <img src="/img/icons8-feedback-57.png" alt="Feedback" className="nav-item-image mr-2" />
//           <span className="size-nav-item"><strong>Feedback</strong></span>
//         </span>
//       </Nav.Link>
//     </Nav>
//   );
// }

import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../src/assets/images/Logo.png';
import NavItem from './NavItem';
import './index.css';

export default function MenuLayout() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Nav className="d-flex flex-column bg-light p-4 nav-container">
      {/* Logo */}
      <div className="mb-4">
        <Nav.Link href="/admin" className="text-muted">
          <img src={logo} alt="Logo" style={{ width: 'auto', height: '80px' }} />
        </Nav.Link>
      </div>

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/dashboard" 
        iconSrc="/img/icons8-dashboard-57.png" 
        label="Dashboard" 
      />

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/account-manager" 
        iconSrc="/img/icons8-account-57.png" 
        label="Accounts" 
      />

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/category-manager" 
        iconSrc="/img/icons8-category-57.png" 
        label="Category" 
      />

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/product-manager" 
        iconSrc="/img/icons8-product-57.png" 
        label="Product" 
      />

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/delivery-manager" 
        iconSrc="/img/icons8-delivery-57.png" 
        label="Delivery" 
      />

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/order-manager" 
        iconSrc="/img/icons8-order-57.png" 
        label="Order" 
      />

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/lab-manager" 
        iconSrc="/img/icons8-labsupport-57.png" 
        label="Lab Support" 
      />

      <NavItem 
        handleNavigation={handleNavigation} 
        path="/admin/feedback-manager" 
        iconSrc="/img/icons8-feedback-57.png" 
        label="Feedback" 
      />
    </Nav>
  );
}

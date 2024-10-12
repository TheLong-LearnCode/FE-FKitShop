import "./index.css";
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  CarOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  CommentOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const AdminMenu = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/admin/account-manager">Account</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
        <Link to="/admin/order-manager">Order</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Product Manager">
        <Menu.Item key="4">
          <Link to="/admin/overall-manager/kit-manager">Kit</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/admin/overall-manager/component-manager">Component</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/admin/overall-manager/lab-manager">Lab</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="4">
          <Link to="/admin/overall-manager/category-manager">Category</Link>
        </Menu.Item>
      <Menu.Item key="5">
          <Link to="/admin/overall-manager/tag-manager">Tag</Link>
        </Menu.Item>
      <Menu.Item key="6" icon={<CarOutlined />}>
        <Link to="/admin/delivery-manager">Delivery</Link>
      </Menu.Item>
      <Menu.Item key="7" icon={<ExperimentOutlined />}>
        <Link to="/admin/lab-support">Support</Link>
      </Menu.Item>
      <Menu.Item key="8" icon={<FileTextOutlined />}>
        <Link to="/admin/labGuide-manager">Lab Guide</Link>
      </Menu.Item>
      <Menu.Item key="9" icon={<CommentOutlined />}>
        <Link to="/admin/feedback-manager">Feedback</Link>
      </Menu.Item>
     
    </Menu>
  );
};

export default AdminMenu;

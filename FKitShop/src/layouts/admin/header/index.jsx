import React, { startTransition } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Space, Badge, Dropdown, Menu } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { logout } from "../../../redux/slices/authSlice";
import "./index.css"; // Tạo file CSS mới cho header
import { Notification } from '../../../component/UserProfile/UpdateAccount/Notification';

const { Header } = Layout;
const { Search } = Input;

export default function HeaderLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    startTransition(() => {
      dispatch(logout());
      navigate("/");
      Notification("Notification", "LOG OUT SUCCESSFULLY", 3, "success")
    });
  };

  const handleViewProfile = () => {
    // Implement view profile logic here
    
    console.log("View profile clicked");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={handleViewProfile}>
        View Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Header
        className="bg-white"
        style={{
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Search
            placeholder="Search for..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 16,
            alignItems: "center",
          }}
        >
          <Space size="large" align="center">
            <Badge dot>
              <BellOutlined className="header-icon" style={{ fontSize: 20 }} />
            </Badge>
            <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
              <SettingOutlined
                className="header-icon"
                style={{ fontSize: 20 }}
              />
            </Dropdown>
          </Space>
        </div>
      </Header>
    </div>
  );
}

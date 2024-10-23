// ProfileInformation.js
import React, { useState } from "react";
import { Alert, Card, Avatar, Typography, Descriptions } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  LinuxOutlined,
} from "@ant-design/icons";
import "./Information.css"; // Chúng ta sẽ tạo file CSS riêng cho component này

const { Title } = Typography;

export default function ProfileInformation({ userInfo }) {
  const [showMessage, setShowMessage] = useState(true);

  if (!userInfo) {
    return (
      <Alert
        message="Important Notice"
        description="Press CTRL+R to reload the profile!"
        type="info"
        closable
        onClose={() => setShowMessage(false)}
        showIcon
      />
    );
  }

  const { fullName, dob, phoneNumber, email, createDate, role } = userInfo;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  return (
    <Card className="profile-card">
      <div className="profile-header">
        <img
          src={
            userInfo.image ? (
              userInfo.image
            ) : (
              "/img/user.png"
            )
          }
          alt="Profile"
          className="profile-avatar"
          style={{height: "100px", width: "100px", borderRadius: "100%"}}
        />
        <Title level={2}>{fullName}</Title>
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          label={
            <>
              {" "}
              <UserOutlined /> Role
            </>
          }
        >
          {role}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <LinuxOutlined /> Age
            </>
          }
        >
          {age}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <PhoneOutlined /> Phone Number
            </>
          }
        >
          {phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <MailOutlined /> Email
            </>
          }
        >
          {email}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Participant Date
            </>
          }
        >
          {createDate}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

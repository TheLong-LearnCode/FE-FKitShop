import React, { useEffect } from "react";
import HeaderLayout from "./header";
import MenuLayout from "./menu";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { loadUserFromCookie, verifyToken } from "../../service/authUser";
import { Col, Container, Row } from "react-bootstrap";

export default function AdminLayOut() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      dispatch(loadUserFromCookie(token));
      console.log("token in UserLayout", token);
      try {
        const response = await verifyToken(token);
        console.log("RESULTT IN USERLAYOUT: ", response);
        const userRole = response.data.role;
        console.log("USERROLE IN USERLAYOUT: ", userRole);
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col lg={3} className="menu-layout">
          <MenuLayout />
        </Col>
        <Col lg={9}>
          <HeaderLayout className="content-layout" />
          <hr style={{ borderTop: "2px solid black", margin: "20px 0" }} />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

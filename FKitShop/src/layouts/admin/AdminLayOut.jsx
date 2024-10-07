import React, { useEffect } from 'react'
import HeaderLayout from './header'
import MenuLayout from './menu'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { loadUserFromCookie } from '../../service/authUser';
import { Col, Container, Row } from 'react-bootstrap';

export default function AdminLayOut() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");

    dispatch(loadUserFromCookie(token));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col lg={3} className='menu-layout'>
          <MenuLayout />
        </Col>
        <Col lg={9}>
          <HeaderLayout className='content-layout'/>
          <hr style={{ borderTop: '2px solid black', margin: '20px 0' }} />
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

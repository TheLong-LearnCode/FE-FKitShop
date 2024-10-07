import React, { useEffect } from 'react'
import Header from './Header/Header.jsx'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { loadUserFromCookie } from '../../service/authUser.jsx';
import Footer from './Footer/Footer.jsx';

export default function UserLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");

    dispatch(loadUserFromCookie(token));
    console.log("token in UserLayout");
    console.log(token);

  }, []);


  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

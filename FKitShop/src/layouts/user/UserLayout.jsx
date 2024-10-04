import React, { useEffect } from 'react'
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { loadUserFromCookie } from '../../service/authUser.jsx';
export default function UserLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("token in UserLayout: ", token);
    
    dispatch(loadUserFromCookie(token));

  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

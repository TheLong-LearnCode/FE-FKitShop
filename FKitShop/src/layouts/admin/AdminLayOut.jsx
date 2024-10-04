import React, { useEffect } from 'react'
import HeaderLayout from './header'
import MenuLayout from './menu'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { loadUserFromCookie } from '../../service/authUser';

export default function AdminLayOut() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");

    dispatch(loadUserFromCookie(token));

  }, []);

  return (
    <>
      <HeaderLayout />
      <Outlet />
      <MenuLayout />
    </>
  )
}

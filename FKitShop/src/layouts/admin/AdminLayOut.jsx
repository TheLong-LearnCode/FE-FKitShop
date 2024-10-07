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
      <div className="admin-dashboard">
        {/* Sidebar Menu */}
        <div className="d-flex">
          <MenuLayout />

          {/* Main content */}
          <div className="w-100">
            {/* Header */}
            <HeaderLayout />

            {/* Main content layout */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

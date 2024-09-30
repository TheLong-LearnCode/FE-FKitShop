import React from 'react'
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

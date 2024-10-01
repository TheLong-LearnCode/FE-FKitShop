import { Button } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/authSlice';


export default function Dashboard() {
  //lấy dữ liệu
  const data = useSelector((state) => state.auth);
  //action
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Data: ", data);

  const handleLogout = () => {
    dispatch(logout());

    //chuyển hướng về trang login
    navigate("/login");
  }

  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  )
}

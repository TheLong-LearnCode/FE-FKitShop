import React, { useState, useTransition, useEffect, Suspense } from 'react';
import './Header.css';
import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { verifyToken } from '../../../service/authUser';
import { IDLE } from '../../../redux/constants/status';
import { unwrapResult } from '@reduxjs/toolkit';

export default function Header() {
    const [isPending, startTransition] = useTransition();
    const [activeLink, setActiveLink] = useState('');
    const [userInfo, setUserInfo] = useState(null); // Lưu trữ thông tin người dùng sau khi verify token
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy thông tin người dùng từ Redux Store
    const user = useSelector((state) => state.auth);
    console.log("user in Header: ", user);
    const userDataStatus = useSelector((state) => state.auth.data);
    console.log("userStatus: ", userDataStatus);

    var userToken;
    var userData;
    useEffect(() => {
        console.log("user.data.token: ", user.data?.token);
        if (user.data !== null) {
            userToken = user.data?.token;

        } if (user.status === IDLE && user.data !== null) {
            userToken = user.data;
        }
        console.log("userToken in Header: ", userToken);
        console.log("user.data: ", user.data);


        const fetchUserInfo = async () => {
            try {
                userData = await verifyToken(userToken); // Gọi hàm verifyToken để lấy dữ liệu
                console.log("user after verify token: ", userData);

                setUserInfo(userData); // Lưu thông tin user vào state
                console.log("user after verify token2: ", userData);
            } catch (error) {
                console.error("Error verifying token: ", error);
            }
        };
        fetchUserInfo(); // Gọi API lấy thông tin người dùng
    }, [user.data]); //user.data là thông tin người dùng


    //khi load lại thì user.data là chuỗi token

    const handleNavClick = (linkName) => {
        startTransition(() => {
            setActiveLink(linkName);
        });
    };

    const handleLogout = () => {
        startTransition(() => {
            dispatch(logout()); // Xóa token và cập nhật trạng thái đăng xuất
            navigate('/');  // Điều hướng về trang đăng nhập
        });
    };

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <header className='sticky-header fixed-top'>
                    <nav>
                        <div className='upper-nav'>
                            <Link to={'/home'} onClick={() => handleNavClick('Home')}>
                                <img className='upper-nav-logo' src="/img/Logo.png" alt="shop logo" />
                            </Link>
                            <form className="upper-nav-search-form">
                                <input
                                    type="search"
                                    placeholder="Search product..."
                                    aria-label="Search"
                                />
                                <button type="submit">
                                    <box-icon name='search' color='#000000'></box-icon>
                                </button>
                            </form>

                            <div className='upper-nav-user-actions'>
                                <Link to={'/cart'} className='upper-nav-item'>
                                    <box-icon name='cart' color='#ffffff'></box-icon>
                                    <span>Cart (0)</span>
                                </Link>

                                <div className="dropdown">
                                    <a className="dropdown-toggle upper-nav-item" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                        <box-icon name='user' color='#ffffff'></box-icon>
                                        <span>Account</span>
                                    </a>
                                    <div className="dropdown-menu">
                                        {(userDataStatus === undefined || userDataStatus === null) ? (
                                            <>
                                                <Link to={'/login'} className="dropdown-item">Sign In</Link>
                                                <Link to={'/register'} className="dropdown-item">Sign Up</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to={'/user/information'} className="dropdown-item">My Profile</Link>
                                                <button onClick={handleLogout} className="dropdown-item">Log Out</button>
                                            </>
                                        )}
                                        <Link to={'/favoriteList'} className="dropdown-item">Favorite List</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className='lower-nav-menu'>
                            <li>
                                <Link
                                    to={'/home'}
                                    className={`nav-menu-link ${activeLink === 'Home' ? 'active' : ''}`}
                                    onClick={() => {
                                        handleNavClick('Home');
                                    }}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-menu-link ${activeLink === 'Product' ? 'active' : ''}`}
                                    onClick={() => {
                                        handleNavClick('Product');
                                    }}
                                    data-toggle="modal" data-target="#tagModal"
                                >
                                    Product
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/blog'}
                                    className={`nav-menu-link ${activeLink === 'Blog' ? 'active' : ''}`}
                                    onClick={() => {
                                        handleNavClick('Blog');
                                    }}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/contact'}
                                    className={`nav-menu-link ${activeLink === 'Contact' ? 'active' : ''}`}
                                    onClick={() => {
                                        handleNavClick('Contact');
                                    }}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="modal fade" id="tagModal" tabIndex="-1" aria-labelledby="tagModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content product-tag-container">
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">All</Link>
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">Arduino</Link>
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">STEM Robotics & AI & IoT</Link>
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">Sensor</Link>
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">STEM Programming</Link>
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">Accessories and Tools</Link>
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">STEM Toy</Link>
                            <Link className="product-tag" to={'/product'} data-toggle="modal" data-target="#categoryModal">Module</Link>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
                    <div className="modal-dialog container">
                        <div className="modal-content product-category-container row">
                            <Link to={'/product'} >Ardunio board</Link>
                            <Link to={'/product'} >Arduino Shield</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                            <Link to={'/product'} >Arduino Accessories</Link>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}


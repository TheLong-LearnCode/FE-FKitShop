import React, { useState, useTransition, Suspense, useEffect } from 'react';
import './Header.css';
import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';

export default function Header() {
    const [isPending, startTransition] = useTransition();
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy thông tin người dùng từ Redux Store
    const user = useSelector((state) => state.auth.data);
    
    const handleNavClick = (linkName) => {
        startTransition(() => {
            setActiveLink(linkName);
        });
    };

    const handleLogout = () => {
        startTransition(() => {
            dispatch(logout()); // Xóa token và cập nhật trạng thái đăng xuất
        });
    };

    // Use useEffect to navigate to /login when the user logs out
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

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
                                        {user ? (
                                            <>
                                                <Link to={'/user/profile'} className="dropdown-item">My Profile</Link>
                                                <button onClick={handleLogout} className="dropdown-item">Log Out</button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to={'/login'} className="dropdown-item">Sign In</Link>
                                                <Link to={'/register'} className="dropdown-item">Sign Up</Link>
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
            </Suspense>
        </div>
    );
}

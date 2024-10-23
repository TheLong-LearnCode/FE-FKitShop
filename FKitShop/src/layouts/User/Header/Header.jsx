import React, { useState, useTransition, useEffect, Suspense } from 'react';
import './Header.css';
import 'boxicons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { verifyToken } from '../../../service/authUser';
import { IDLE } from '../../../redux/constants/status';
import { unwrapResult } from '@reduxjs/toolkit';
import { Notification } from '../../../component/UserProfile/UpdateAccount/Notification';
import { GET } from '../../../constants/httpMethod';
import api from '../../../config/axios';

export default function Header() {
    const [isPending, startTransition] = useTransition();
    const [activeLink, setActiveLink] = useState('');
    const [userInfo, setUserInfo] = useState(null); // Lưu trữ thông tin người dùng sau khi verify token
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productTags, setProductTags] = useState([]);

    // Lấy thông tin người dùng từ Redux Store
    const user = useSelector((state) => state.auth);
    //console.log("user in Header: ", user);
    const userDataStatus = useSelector((state) => state.auth.data);
    //console.log("userStatus: ", userDataStatus);

    var userToken;
    var userData;
    useEffect(() => {
        //console.log("user.data.token: ", user.data?.token);
        if (user.data !== null) {
            userToken = user.data?.token;

        } if (user.status === IDLE && user.data !== null) {
            userToken = user.data;
        }
        //console.log("userToken in Header: ", userToken);
        //console.log("user.data: ", user.data);


        const fetchUserInfo = async () => {
            try {
                userData = await verifyToken(userToken); // Gọi hàm verifyToken để lấy dữ liệu
                //console.log("user after verify token: ", userData);
                setUserInfo(userData); // Lưu thông tin user vào state

            } catch (error) {
                console.error("Error verifying token: ", error);
            }
        };
        fetchUserInfo(); // Gọi API lấy thông tin người dùng
    }, [user.data]); //user.data là thông tin người dùng

    const handleNavClick = (linkName) => {
        startTransition(() => {
            setActiveLink(linkName);
        });
    };

    const handleLogout = () => {
        startTransition(() => {
            dispatch(logout()); // Xóa token và cập nhật trạng thái đăng xuất
            Notification("Notification", "LOG OUT SUCCESSFULLY", 3, "success")
            navigate('/');  // Điều hướng về trang đăng nhập
        });
    };

    const cartProducts = useSelector(state => state.cart.products);

    // Thêm state cho menu product
    const [showProductMenu, setShowProductMenu] = useState(false);
    const [activeTag, setActiveTag] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await api[GET]('/tags');
                const activeTags = response.data.filter(item => item.tag.status === 1);
                const formattedTags = activeTags.map(item => ({
                    name: item.tag.tagName,
                    categories: item.cates,
                }));
                setProductTags(formattedTags);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);

    

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
                                    <span>Cart ({cartProducts.length})</span>
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
                            <li className="product-menu-container"
                                onMouseEnter={() => setShowProductMenu(true)}
                                onMouseLeave={() => setShowProductMenu(false)}>
                                <Link
                                    className={`nav-menu-link ${activeLink === 'Product' ? 'active' : ''}`}
                                    onClick={() => handleNavClick('Product')}
                                >
                                    Product
                                </Link>
                                {showProductMenu && (
                                    <div className="product-submenu">
                                        <div className="tags-list">
                                            {productTags.map((tag, index) => (
                                                <div
                                                    key={index}
                                                    className="tag-item"
                                                    onMouseEnter={() => setActiveTag(tag.name)}
                                                    onMouseLeave={() => setActiveTag(null)}>
                                                    {tag.name}
                                                    {activeTag === tag.name && (
                                                        <div className="categories-list">
                                                            {tag.categories.map((category) => (
                                                                <Link className="categories-list-cate" key={category.id} to={`/products/${category.categoryID}`}>
                                                                    {category.categoryName}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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

                {showProductMenu && <div className="overlay"></div>}
            </Suspense>
        </div>
    )
}


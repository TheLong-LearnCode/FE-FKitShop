import React, { useState } from 'react'
import './Header.css'
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom'

export default function Header() {
    const [activeLink, setActiveLink] = useState('');
    const onClose= null;

    const handleNavClick = (linkName) => {
        setActiveLink(linkName);
    };
    return (
        <div>
            <header className='sticky-header fixed-top'>
                <nav>
                    <div className='upper-nav'>
                        <Link to={'/home'}>
                            <img className='upper-nav-logo' src="/img/Logo.png" alt="shop logo" />
                        </Link>
                        <form className="upper-nav-search-form">
                            <input
                                type="search"
                                placeholder="Search product..."
                                aria-label="Search"
                            />
                            <button type="submit">
                                <box-icon name='search' color='#000000' ></box-icon>
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
                                    <Link to={'/signin'} className="dropdown-item">Sign In</Link>
                                    <Link to={'/signup'} className="dropdown-item">Sign Up</Link>
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
                                onClick={() => handleNavClick('Home')}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#product-menu"
                                className={`nav-menu-link ${activeLink === 'Product' ? 'active' : ''}`}
                                onClick={() => handleNavClick('Product')}
                            >
                                Product
                            </a>
                        </li>
                        <li>
                            <Link
                                to={'/blog'}
                                className={`nav-menu-link ${activeLink === 'Blog' ? 'active' : ''}`}
                                onClick={() => handleNavClick('Blog')}
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/contact'}
                                className={`nav-menu-link ${activeLink === 'Contact' ? 'active' : ''}`}
                                onClick={() => handleNavClick('Contact')}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <div id='product-menu' className='overlay' onClick={onClose}>
                        <div className="popup">
                            
                        </div>
                    </div>

                </div>
            </header >
        </div >
    )
}

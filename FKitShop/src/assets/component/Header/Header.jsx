import React, { useState } from 'react'
import './Header.css'
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function Header() {
    const [activeLink, setActiveLink] = useState('');

    const handleNavClick = (linkName) => {
        setActiveLink(linkName);
    };
    return (
        <div>
            <header>
                <nav>
                    <div className='upper-nav'>
                        <a href="#">
                            <img className='upper-nav-logo' src="/img/Logo.png" alt="shop logo" />
                        </a>
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
                            <a href="#" className='upper-nav-item'>
                                <box-icon name='cart' color='#ffffff'></box-icon>
                                <span>Cart (0)</span>
                            </a>

                            <div className="dropdown">
                                <a className="dropdown-toggle upper-nav-item" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                    <box-icon name='user' color='#ffffff'></box-icon>
                                    <span>Account</span>
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Sign In</a>
                                    <a className="dropdown-item" href="#">Sign Up</a>
                                    <a className="dropdown-item" href="#">Favorite List</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <ul className='lower-nav-menu'>
                    <li>
                            <a 
                                href="#" 
                                className={`nav-menu-link ${activeLink === 'Home' ? 'active' : ''}`}
                                onClick={() => handleNavClick('Home')}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className={`nav-menu-link ${activeLink === 'Product' ? 'active' : ''}`}
                                onClick={() => handleNavClick('Product')}
                            >
                                Product
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className={`nav-menu-link ${activeLink === 'Blog' ? 'active' : ''}`}
                                onClick={() => handleNavClick('Blog')}
                            >
                                Blog
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className={`nav-menu-link ${activeLink === 'Contact' ? 'active' : ''}`}
                                onClick={() => handleNavClick('Contact')}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

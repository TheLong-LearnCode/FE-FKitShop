import React, { useState } from 'react'
import './Header.css'
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap';



export default function Header() {

    const [activeLink, setActiveLink] = useState('');

    const handleNavClick = (linkName) => {
        setActiveLink(linkName);
    };

    return (
        <div>
            <header className='sticky-header fixed-top'>
                <nav>
                    <div className='upper-nav'>
                        <Link to={'/home'}  onClick={() => handleNavClick('Home')}>
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
                                    <Link to={'/signin'} className="dropdown-item" >Sign In</Link>
                                    <Link to={'/signup'} className="dropdown-item" >Sign Up</Link>
                                    <Link to={'/favoriteList'} className="dropdown-item" >Favorite List</Link>
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
            </header >
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
                        <Link  to={'/product'} >Ardunio board</Link>
                        <Link  to={'/product'} >Arduino Shield</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>
                        <Link  to={'/product'} >Arduino Accessories</Link>


                        
                    </div>
                </div>
            </div>
        </div >
    )
}

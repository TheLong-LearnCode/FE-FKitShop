import React, { useState } from 'react'
import Modal from 'react-modal';
import './Header.css'
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap';

Modal.setAppElement('#root');

export default function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Mở popup
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Đóng popup
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [activeLink, setActiveLink] = useState('');
    const onClose = null;

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
                                    <Link to={'/signin'} className="dropdown-item" onClick={closeModal}>Sign In</Link>
                                    <Link to={'/signup'} className="dropdown-item" onClick={closeModal}>Sign Up</Link>
                                    <Link to={'/favoriteList'} className="dropdown-item" onClick={closeModal}>Favorite List</Link>
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
                                    closeModal();
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
                                    openModal();
                                }}

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
                                    closeModal();
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
                                    closeModal();
                                }}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Product menu"
                    style={{
                        content: {
                            top: '16%',
                            left: '30%',
                            height: '230px',
                            width: '230px',
                            overflow: 'hidden',
                            borderRadius: '10px',
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.25)', // Màu overlay mờ
                        },
                    }}
                >
                    <div className="product-tag-container">
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>All</Link>
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>Arduino</Link>
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>STEM Robotics & AI & IoT</Link>
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>Sensor</Link>
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>STEM Programming</Link>
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>Accessories and Tools</Link>
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>STEM Toy</Link>
                        <Link className="product-tag" to={'/product'} onClick={closeModal}>Module</Link>
                    </div>
                </Modal>
                
            </header >
        </div >
    )
}

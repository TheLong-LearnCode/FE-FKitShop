import React, { useState } from 'react'
import Modal from 'react-modal';
import './Header.css'
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom'
import ProductPopup from '../Popup/ProductPopup'

Modal.setAppElement('#root');

const products = [
    { id: 1, name: 'Sản phẩm 1', price: '$10' },
    { id: 2, name: 'Sản phẩm 2', price: '$20' },
    { id: 3, name: 'Sản phẩm 3', price: '$30' },
];

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
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            padding: '20px',
                            width: '400px',
                        },
                    }}
                >
                    <h2>Danh sách sản phẩm</h2>
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                {product.name} - {product.price}
                            </li>
                        ))}
                    </ul>
                    <button onClick={closeModal}>Đóng</button>
                </Modal>
            </header >
        </div >
    )
}

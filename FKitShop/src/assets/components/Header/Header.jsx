import React from 'react'
import './Header.css'
import 'boxicons'

export default function Header() {
    return (
        <div>
            <header>
                <nav>
                    <div className='upper-nav'>
                        <a href="">
                            <img className='nav-logo' src="public\img\Logo.png" alt="shop logo" />
                        </a>
                        <form className="search-form">
                            <input
                                type="search"
                                placeholder="Search product..."
                                aria-label="Search"
                            />
                            <button type="submit">
                                <box-icon name='search' color='#000000'></box-icon>
                            </button>
                        </form>

                        <div className='user-actions'>
                            <a href="#" className='nav-item'>
                                <box-icon name='cart' color='#ffffff'></box-icon>
                                <span>Cart (0)</span>
                            </a>
                            <a href="#" className='nav-item'>
                                <box-icon name='user' color='#ffffff'></box-icon>
                                <span>Account</span>
                            </a>
                        </div>

                    </div>

                    <ul className='nav-menu'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Product</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

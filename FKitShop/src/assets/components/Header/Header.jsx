import React from 'react'
import './Header.css'
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.min.css'

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
                            <div className="dropdown">
                                <a class="nav-link dropdown-toggle nav-item" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                    <box-icon name='user' color='#ffffff'></box-icon>
                                    <span>Account</span>
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Sign In</a>
                                    <a class="dropdown-item" href="#">Sign up</a>
                                    <a class="dropdown-item" href="#">Wishlist</a>
                                </div>
                            </div>
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

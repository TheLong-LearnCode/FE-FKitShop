import React from 'react'
import './Header.css'
import 'boxicons'

export default function Header() {
    return (
        <div>
            <header>
                <nav>
                    <div>
                        <a href="" className='logo'>
                            <img src="public\img\Logo.png" alt="shop logo" />
                        </a>
                        <form className="form-inline mx-auto">
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search product..."
                                aria-label="Search"
                                style={{ borderRadius: '5px' }}
                            />
                            <button><box-icon name='search'></box-icon></button>
                        </form>

                        <div className='nav-cart'>
                            <box-icon name='cart' color='#ffffff' ></box-icon>
                            <p>Cart (0)</p>
                        </div>

                        <div className="nav-acc">
                            <box-icon name='user' color='#ffffff' ></box-icon>
                            <p>Account</p>
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

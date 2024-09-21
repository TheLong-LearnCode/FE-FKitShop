import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.scss';  // Import your custom CSS

function SignUp() {
    const [activeTab, setActiveTab] = useState('signin'); // State to track active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the active tab when clicked
    };

    return (
        <>

            {/* Thêm Header component dô đây nhe */}

            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-3" style={{ width: '370px' }}>

                    <div id="form-sign-in">
                        <ul className="nav nav-tabs d-flex justify-content-between w-100">
                            <li className="nav-item w-50 text-center">
                                <a
                                    className={`nav-link ${activeTab === 'signin' ? 'active font-weight-bold custom-active-tab' : 'custom-inactive-tab'}`}
                                    href="#signin"
                                    onClick={() => handleTabClick('signin')}
                                    data-toggle="tab"
                                >
                                    Sign In
                                </a>
                            </li>
                            <li className="nav-item w-50 text-center">
                                <a
                                    className={`nav-link ${activeTab === 'signup' ? 'active font-weight-bold custom-active-tab' : 'custom-inactive-tab'}`}
                                    href="#signup"
                                    onClick={() => handleTabClick('signup')}
                                    data-toggle="tab"
                                >
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="tab-content mt-3">
                        <div className={`tab-pane ${activeTab === 'signin' ? 'active' : ''}`} id="signin">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-dark btn-block">Sign In</button>
                            </form>
                        </div>

                        <div className={`tab-pane ${activeTab === 'signup' ? 'active' : ''}`} id="signup">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Full name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Year of birth" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Phone number" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
                            </form>
                            
                            <div className="mt-3 text-center">
                                <button className="btn btn-light btn-block">
                                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
                                    Sign up with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thêm Footer component dô đây nhe */}
        </>
    );
}

export default SignUp;

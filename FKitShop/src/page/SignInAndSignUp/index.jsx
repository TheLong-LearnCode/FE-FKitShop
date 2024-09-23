import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';  // Import your custom CSS
import GoogleButton from '../../component/GoogleButton';
import SignUpForm from '../../component/SignUp';
import SignInForm from '../../component/SignIn';

// import Validator from '../Validator';

function SignInAndSignUp() {
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
                            <SignInForm />
                            <GoogleButton prop="signin"/>
                        </div>

                        <div className={`tab-pane ${activeTab === 'signup' ? 'active' : ''}`} id="signup">
                            <SignUpForm />
                            <GoogleButton prop="signup"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thêm Footer component dô đây nhe */}
        </>
    );
}

export default SignInAndSignUp;
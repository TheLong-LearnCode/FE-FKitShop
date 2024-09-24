import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';  // Import your custom CSS
import GoogleButton from '../../component/GoogleButton';
import SignUpForm from '../../component/SignUp';
import SignInForm from '../../component/SignIn';

function SignInAndSignUp() {
    const [activeTab, setActiveTab] = useState('signin'); // State to track active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the active tab when clicked
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-3" style={{ width: '370px' }}>
                    <div id="form-sign-in">
                        <ul className="nav nav-tabs d-flex justify-content-between w-100">
                            <li className="nav-item w-50 text-center">
                                <a
                                    className={`nav-link ${activeTab === 'signin' ? 'active font-weight-bold custom-active-tab' : 'custom-inactive-tab'}`}
                                    href="#signin"
                                    onClick={() => handleTabClick('signin')}
                                >
                                    Sign In
                                </a>
                            </li>
                            <li className="nav-item w-50 text-center">
                                <a
                                    className={`nav-link ${activeTab === 'signup' ? 'active font-weight-bold custom-active-tab' : 'custom-inactive-tab'}`}
                                    href="#signup"
                                    onClick={() => handleTabClick('signup')}
                                >
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-content mt-3">
                        <div className={`tab-pane ${activeTab === 'signin' ? 'active' : ''}`} id="signin">
                            {activeTab === 'signin' && <SignInForm />}
                            {activeTab === 'signin' && <GoogleButton prop="signin" />}
                        </div>

                        <div className={`tab-pane ${activeTab === 'signup' ? 'active' : ''}`} id="signup">
                            {activeTab === 'signup' && <SignUpForm />}
                            {activeTab === 'signup' && <GoogleButton prop="signup" />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInAndSignUp;

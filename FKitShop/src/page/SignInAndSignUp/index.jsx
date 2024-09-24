import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';  // Import your custom CSS
import GoogleButton from '../../component/GoogleButton';
import SignUpForm from '../../component/SignUp';
import SignInForm from '../../component/SignIn';
import Validator from "../../component/Validator";

import Header from '../../component/Header/Header.jsx';
import Footer from '../../component/Footer/Footer.jsx';

const totalDigitsPhoneNumber = 10;
const passwordLength = 6;

function SignInAndSignUp() {
    const [activeTab, setActiveTab] = useState('signin'); // State to track active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the active tab when clicked
    };

    useEffect(() => {

        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        // Run validation depending on the active tab
        if (activeTab === 'signin') {

            Validator({
                form: '#form-sign-in',
                formGroupSelector: '.form-group',
                errorSelector: '.form-message',
                rules: [
                    Validator.isEmail('#form-sign-in #email'),
                    Validator.minLength('#form-sign-in #password', 6),
                ],
                onSubmit: function (data) {
                    // Gọi API hoặc xử lý dữ liệu Sign In
                    console.log('Sign In Data:', data);

                    // Ví dụ gọi API
                    fetch('/api/signin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            console.log('Success:', result);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            });
        } else if (activeTab === 'signup') {
            Validator({
                form: '#form-sign-up',
                formGroupSelector: '.form-group',
                errorSelector: '.form-message',
                rules: [
                    Validator.isRequired('#form-sign-up #fullname', 'Please enter your full name'),
                    Validator.isRequired('#form-sign-up #yob', 'Please enter your year of birth'),
                    Validator.isValidDate('#form-sign-up #yob', ''),
                    Validator.isRequired('#form-sign-up #phone', 'Please enter your phone number'),
                    Validator.isPhoneNumber('#form-sign-up #phone', '', totalDigitsPhoneNumber),
                    Validator.isRequired('#form-sign-up #email', 'Please enter your email'),
                    Validator.isEmail('#form-sign-up #email'),
                    Validator.isRequired('#form-sign-up #password', 'Please enter your password'),
                    Validator.minLength('#form-sign-up #password', passwordLength),
                ],
                onSubmit: function (data) {
                    // Gọi API hoặc xử lý dữ liệu Sign Up
                    console.log('Sign Up Data:', data);

                    // Ví dụ gọi API
                    fetch('/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            console.log('Success:', result);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            });
        }
    }, [activeTab]);


    return (
        <>
            <Header />
            <div id="mooc" className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-3 card-shadow" style={{ width: '370px' }}>
                    <div id="form-tabs">
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
            <Footer />
        </>
    );
}

export default SignInAndSignUp;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';  // Import your custom CSS
import SignUpForm from '../../component/SignUp';
import SignInForm from '../../component/SignIn';
import Validator from "../../component/Validator";


import {signUpUser, loginUser} from '../../service/authUser.jsx'

const totalDigitsPhoneNumber = 10;
const passwordLength = 6;

function SignInSignUp() {
    const [activeTab, setActiveTab] = useState('signin'); // State to track active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the active tab when clicked
        document.getElementById(`tab-content-${tab}`).scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        // Validation logic here
        if (activeTab === 'signin') {
            Validator({
                form: '#form-sign-in',
                formGroupSelector: '.form-group',
                errorSelector: '.form-message',
                rules: [
                    Validator.isEmail('#form-sign-in #email'),
                    Validator.minLength('#form-sign-in #password', 6),
                ],
                // onSubmit: function (data) {
                //     console.log('Sign In Data:', data);
                //     fetch('/api/login', {
                //         method: 'POST',
                //         headers: { 'Content-Type': 'application/json' },
                //         body: JSON.stringify(data),
                //     })
                //         .then((response) => response.json())
                //         .then((result) => console.log('Success:', result))
                //         .catch((error) => console.error('Error:', error));
                // },
                onSubmit: async (data) => {
                    try {
                        // Make sure data is correctly structured
                        const loginData = {
                            email: data.email,
                            password: data.password,
                        };
                        console.log(JSON.stringify(loginData));

                        const result = await loginUser(loginData);
                        console.log('Login Success:', result);
                    } catch (error) {
                        console.error('Login Error:', error);
                    }
                },

            });
        } else if (activeTab === 'signup') {
            Validator({
                form: '#form-sign-up',
                formGroupSelector: '.form-group',
                errorSelector: '.form-message',
                rules: [
                    Validator.isRequired('#form-sign-up #fullName', 'Please enter full name'),
                    Validator.isRequired('#form-sign-up #dob', 'Please enter date of birth'),
                    Validator.isValidDate('#form-sign-up #dob', ''),
                    Validator.isRequired('#form-sign-up #phoneNumber', 'Please enter phone number'),
                    Validator.isPhoneNumber('#form-sign-up #phoneNumber', '', totalDigitsPhoneNumber),
                    Validator.isRequired('#form-sign-up #email', 'Please enter email'),
                    Validator.isEmail('#form-sign-up #email'),
                    Validator.isRequired('#form-sign-up #password', 'Please enter password'),
                    Validator.minLength('#form-sign-up #password', passwordLength),
                    Validator.isRequired('#form-sign-up #password_confirmation', 'Please confirm password'),
                    Validator.isConfirmed('#form-sign-up #password_confirmation', function () {
                        return document.querySelector('#form-sign-up #password').value;
                    }, 'Passwords do not match')
                ],
                // onSubmit: function (data) {
                //     console.log('Sign Up Data:', data);
                //     fetch('/api/signup', {
                //         method: 'POST',
                //         headers: { 'Content-Type': 'application/json' },
                //         body: JSON.stringify(data),
                //     })
                //         .then((response) => response.json())
                //         .then((result) => console.log('Success:', result))
                //         .catch((error) => console.error('Error:', error));
                // }
                onSubmit: async (rawData) => {
                    const{password_confirmation, ...data}= rawData;

                    console.log('Sign Up Data:', data);
                    try {
                        const result = await signUpUser(data);
                        console.log('Sign Up Success:', result);
                    } catch (error) {
                        console.error('Sign Up Error:', error);
                    }
                },
            });
        }
    }, [activeTab]);

    return (
        <>
            {/* <Header /> */}
            <div id="mooc" className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card p-3 card-shadow" style={{
                    width: activeTab === 'signup' ? '600px' : '370px',
                    overflow: 'auto',
                }}>
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
                        <div className={`tab-pane ${activeTab === 'signin' ? 'active show' : 'fade'}`} id="tab-content-signin">
                            {activeTab === 'signin' && <SignInForm />}
                        </div>

                        <div className={`tab-pane ${activeTab === 'signup' ? 'active show' : 'fade'}`} id="tab-content-signup">
                            {activeTab === 'signup' && <SignUpForm />}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default SignInSignUp;

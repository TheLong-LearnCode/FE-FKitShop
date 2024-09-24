import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';  // Import your custom CSS
import GoogleButton from '../../component/GoogleButton';
import SignUpForm from '../../component/SignUp';
import SignInForm from '../../component/SignIn';
import Validator from "../../component/Validator";

const totalDigitsPhoneNumber = 10;
const passwordLength = 6;

function SignInAndSignUp() {
    const [activeTab, setActiveTab] = useState('signin'); // State to track active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the active tab when clicked
    };

    useEffect(() => {
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
                    //call API
                    console.log('Sign In Data:', data);
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
                    // Call API
                    console.log('Sign Up Data:', data);
                }
            });
        }
    }, [activeTab]); // This ensures the validation is set up when the active tab changes

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-3" style={{ width: '370px' }}>
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
        </>
    );
}

export default SignInAndSignUp;

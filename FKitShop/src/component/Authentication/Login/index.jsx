import React, { useState, useEffect, useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import SignUpForm from '../SignUp/index.jsx';
import SignInForm from '../SignIn/index.jsx';
import Validator from "../../Validator/index.jsx";
import { message } from 'antd';
import { signUpUser, loginUser } from '../../../service/authUser.jsx';

const totalDigitsPhoneNumber = 10;
const passwordLength = 6;

function SignInSignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('signin');
    const [isPending, startTransition] = useTransition();

    const handleTabClick = (tab) => {
        startTransition(() => {
            setActiveTab(tab);
            navigate(`/${tab}`);
            document.getElementById(`tab-content-${tab}`).scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    };

    useEffect(() => {
        // Set activeTab based on the current path
        const currentPath = location.pathname.replace('/', '');
        setActiveTab(currentPath === 'signup' ? 'signup' : 'signin');
    }, [location]);

    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        if (activeTab === 'signin') {
            Validator({
                form: '#form-sign-in',
                formGroupSelector: '.form-group',
                errorSelector: '.form-message',
                rules: [
                    Validator.isEmail('#form-sign-in #email'),
                    Validator.minLength('#form-sign-in #password', 6),
                ],
                onSubmit: async (data) => {
                    try {
                        const loginData = {
                            email: data.email,
                            password: data.password,
                        };
                        const result = await loginUser(loginData, navigate);
                        message.success('Login successful');
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
                onSubmit: async (rawData) => {
                    const { password_confirmation, ...data } = rawData;
                    try {
                        const response = await signUpUser(data, navigate);
                        message.success("Welcome " + response.data.fullName + ", you've successfully registered!");
                    } catch (error) {
                        console.error('Sign Up Error:', error.response.data.message);
                        message.error(error.response.data.message);
                    }
                },
            });
        }
    }, [activeTab]);

    return (
        <div id="mooc" className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-3 card-shadow" style={{
                width: activeTab === 'signup' ? '600px' : '370px',
                overflow: 'auto',
            }}>
                <div id="form-tabs">
                    <ul className="nav nav-tabs d-flex justify-content-between w-100">
                        <li className="nav-item w-50 text-center">
                            <button
                                className={`btn-cus nav-link ${activeTab === 'signin' ? 'active font-weight-bold custom-active-tab' : 'custom-inactive-tab'}`}
                                onClick={() => handleTabClick('signin')}
                                style={{ fontSize: '1.5rem', background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
                                disabled={isPending}
                            >
                                Sign In
                            </button>
                        </li>
                        <li className="nav-item w-50 text-center">
                            <button
                                className={`btn-cus nav-link ${activeTab === 'signup' ? 'active font-weight-bold custom-active-tab' : 'custom-inactive-tab'}`}
                                onClick={() => handleTabClick('signup')}
                                style={{ fontSize: '1.5rem', background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
                                disabled={isPending}
                            >
                                Sign Up
                            </button>
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
    );
}

export default SignInSignUp;
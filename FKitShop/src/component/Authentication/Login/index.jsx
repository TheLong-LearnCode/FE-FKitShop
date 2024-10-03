import React, { useState, useEffect, useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import SignUpForm from '../SignUp/index.jsx';
import SignInForm from '../SignIn/index.jsx';
import Validator from "../../Validator/index.jsx";
import { message, notification } from 'antd';
import { register, login, verifyToken } from '../../../service/authUser.jsx';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { ROLE_ADMIN } from '../../../constants/role.js';

const totalDigitsPhoneNumber = 10;
const passwordLength = 6;

function SignInSignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('signin');
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const [notificationData, setNotificationData] = useState(null);

    const handleTabClick = (tab) => {
        startTransition(() => {
            setActiveTab(tab);
            if (tab === 'signin') {
                navigate('/login');  // Điều hướng đến /login
            } else {
                navigate('/register');  // Điều hướng đến /register
            }
            document.getElementById(`tab-content-${tab}`).scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    };

    useEffect(() => {
        // Set activeTab based on the current path
        const currentPath = location.pathname.replace('/', '');
        setActiveTab(currentPath === 'register' ? 'signup' : 'signin');
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
                        const user = {
                            email: data.email,
                            password: data.password,
                        };
                        const resultAction = await dispatch(login(user));
                        console.log("resultAction: ", resultAction);
                        console.log(resultAction);
                        //resultAction.payload.data là lấy ra được user
                        const userResponse = resultAction.payload.data.accounts;
                        console.log("userResponse.role: ", userResponse.role)
                        message.success(`Login successfully! 
                            Welcome ${userResponse.role} ${userResponse.fullName}`);
                        if (userResponse.role === ROLE_ADMIN) {
                            //chuyển về dashboard
                            navigate('/admin');
                            console.log("đã vào /admin");
                            
                        } else {
                            navigate('/home');
                        }
                    } catch (error) {
                        console.log(error);
                        const responseError = error?.response?.data?.error;
                        message.error(responseError || "An error occurred.");
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
                        const response = await register(data);
                        console.log("Sign Up Response:", response);
                        message.success(`Welcome ${response.data.fullName}, you've successfully registered!`);
                        navigate('/login'); // Điều hướng sau khi đăng ký thành công
                    } catch (error) {
                        console.error('Sign Up Error:', error.response.data.message);
                        const ErrorMessage = error?.response?.data?.message;
                        message.error(ErrorMessage);
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


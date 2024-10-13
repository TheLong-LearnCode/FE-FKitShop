import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.userName || 'Valued Customer';

    return (
        <div className="order-success-container">
            <div className="order-success-content">
                <h1>Thank You, {userName}!</h1>
                <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h2>Your Order Has Been Placed Successfully</h2>
                <p>We appreciate your business and hope you enjoy your purchase.</p>
                <button className="home-button" onClick={() => navigate('/')}>
                    Return to Home
                </button>
            </div>
        </div>
    );
}
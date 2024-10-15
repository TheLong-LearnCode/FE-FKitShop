import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';
import { usePaymentContext } from '../../../contexts/PaymentContext';

export default function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.userName || 'Valued Customer';
    const { setPaymentStatus } = usePaymentContext();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const transactionStatus = queryParams.get('vnp_TransactionStatus');
        const responseCode = queryParams.get('vnp_ResponseCode');

        if (transactionStatus === '00' && responseCode === '00') {
            setPaymentStatus('success');
        } else {
            setPaymentStatus('fail');
        }
    }, [location, setPaymentStatus]);

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

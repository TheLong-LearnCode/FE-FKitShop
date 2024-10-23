import React, { useState, useEffect } from 'react'
import 'boxicons'
import './CardContent.css'
import { Link } from 'react-router-dom';
import { GET } from '../../../../constants/httpMethod';
import api from '../../../../config/axios';
import AddToCartPopup from '../../../../components/AddToCartPopup';
import { addProductToCart } from '../../../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

export default function CardContent({ product }) {
    const dispatch = useDispatch()

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = (accountID, quantity) => {
        if (accountID && product.productID) {
            dispatch(addProductToCart({
                accountID: accountID,
                productID: product.productID,
                quantity: quantity
            }));
        } else {
            message.error("Login to add product to cart");
        } 
    };

    return (

        <div className="col-md-3 product-card" key={product.productID}>
            <div className="card">
                <img className="card-img-top" src={product.images[0].url} alt={product.name} />
                <button className='like-btn btn'> <i class="bi bi-bag-heart-fill"></i></button>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="price">{formatCurrency(product.price)}</p>
                    <div className="card-bottom">
                        <Link to={`/detail/${product.productID}`}><button className="btn view-detail-btn">View details</button></Link>
                        <button className="btn atc-btn" onClick={() => setShowPopup(true)}>
                            <i class="bi bi-cart-plus-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <AddToCartPopup
                    product={product}
                    onClose={() => setShowPopup(false)}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>

    )
}

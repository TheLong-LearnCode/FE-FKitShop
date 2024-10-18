import React, { useState, useEffect } from 'react'
import 'boxicons'
import './CardContent.css'
import { Link } from 'react-router-dom';
import { GET } from '../../../../constants/httpMethod';
import api from '../../../../config/axios';


export default function CardContent({ product }) {

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (

        <div className="col-md-3 product-card" key={product.productID}>
            <div className="card">
                <img className="card-img-top" src={product.images[0].url} alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="price">{formatCurrency(product.price)}</p>
                    <div className="card-bottom">
                        <Link to={`/detail/${product.productID}`}><button className="btn view-detail-btn">View details</button></Link>
                        <button className="btn atc-btn">
                            <box-icon name='cart' type='solid' color='#000F8F'></box-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

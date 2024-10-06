import React from 'react';
import '../../../util/GlobalStyle/GlobalStyle.css';
import './ProductCart.css';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, increaseQuantity, decreaseQuantity } from '../../../redux/slices/cartSlice';

export default function ProductCart() {
    const CartProducts = useSelector(state => state.cart.CartArr);
    const dispatch = useDispatch();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className='fixed-header' style={{ minHeight: '350px' }}>
            <div className="container mt-4 cart-content">
                <h2>CART</h2>
                <table className="table table-bordered cart-content-table">
                    <thead>
                        <tr>
                            <th>Product information</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CartProducts.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <img src={product.images[0].url} alt={product.name} className='img-fluid' />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>{product.name}</h5>
                                        </div>
                                    </div>
                                </td>
                                <td>{formatCurrency(product.price)}</td>
                                <td>
                                    <div className="form-group">
                                        <div className="input-group" style={{ width: '150px' }}>
                                            <div className="input-group-prepend">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => dispatch(decreaseQuantity(product))}
                                                >
                                                    -
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control text-center"
                                                style={{ backgroundColor: 'white' }}
                                                value={product.quantity}
                                                readOnly
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => dispatch(increaseQuantity(product))}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{formatCurrency(product.price * product.quantity)}</td>
                                <td>
                                    <button className="btn" onClick={() => dispatch(deleteProduct(product))}>
                                        <box-icon name='trash' type='solid' color='#e30a0a'></box-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-right">
                    <h4>Total amount: {formatCurrency(CartProducts.reduce((total, product) => total + (product.price * product.quantity), 0))}</h4>
                    <button className="btn btn-primary">Pay</button>
                </div>
            </div>
        </div>
    );
}
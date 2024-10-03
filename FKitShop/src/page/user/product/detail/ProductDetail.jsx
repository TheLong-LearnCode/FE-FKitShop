import React from 'react'
import '../../../../util/GlobalStyle/GlobalStyle.css'
import { useParams } from 'react-router-dom'
import { Products } from '../ListOfProduct'
import './ProductDetail.css'

export default function ProductDetail() {
    const { id } = useParams()
    const product = Products.find(o => o.productID === id)

    if (!product) return <div>Product not found</div>
    return (
        <div className='fixed-header'>
            <div className="container mt-4" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <img style={{ height: '100%', objectFit: 'contain', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius:'10px' }} src={product.image} alt={product.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6 mt-3">
                        <h2 className='text-center' style={{color: '#000F8F', fontWeight: '500'}}>{product.name}</h2>
                        <div className="row ">
                            <div className="col-md-5  mt-2">
                                <p><strong>Type:</strong> {product.type}</p>
                                <p><strong>In stock:</strong> {product.quantity}</p>
                                <p><strong>Sold:</strong> {product.unitOnOrder}</p>
                            </div>

                            <dv className="col-md-5 mt-2">
                                <p><strong>Status:</strong> {product.status}</p>
                                <p><strong>Publisher:</strong> {product.publisher}</p>
                            </dv>

                        </div>

                        <h3 style={{ color: '#B43F3F' }}>{product.price} VND</h3>

                        <div className="form-group">
                            <label>Quantity:</label>
                            <div className="input-group" style={{ width: '150px' }}>
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary" type="button">-</button>
                                </div>
                                <input type="text" className="form-control text-center" style={{backgroundColor: 'white'}} value="1" readOnly />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-block mb-2 atc-btn">Add to cart</button>
                        
                    </div>
                </div>
            </div>
        </div>

    )
}

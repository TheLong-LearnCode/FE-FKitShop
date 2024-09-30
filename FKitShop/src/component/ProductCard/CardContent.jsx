import React, { useState } from 'react'
import 'boxicons'
import './CardContent.css'


export default function CardContent({productData}) {
    const [product, setProduct] = useState({})
    console.log(productData)
    return (

        <div className='container mt-4 main-content'>
            <div class="product-buttons">
                <button class="btn "> ⏰ New product</button>
                <button class="btn "> 🔥 Hot product</button>
                <button class="btn "> 🌟 Hightly rate</button>
            </div>

            <div className='row'>
                {productData.map((product) => (
                    <div className="col-md-3 product-card" key={product.id}>
                        <div className="card">
                            <img className="card-img-top" src={product.image} alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="price">{product.price}</p>
                                <button className="btn btn-primary">Add to cart</button>
                                <button className="btn btn-light like"><box-icon name='heart' type='solid' color='#b43f3f' ></box-icon> Like</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}




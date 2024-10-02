import React, { useState } from 'react'
import 'boxicons'
import './CardContent.css'

export default function CardContent({ productData }) {
    const [selectedProducts, setSelectedProducts] = useState(productData); // Mặc định hiển thị 6 sản phẩm đầu tiên
    const [activeButton, setActiveButton] = useState('new'); 

    const handleButtonClick = (buttonType) => {
        if (buttonType === 'new') {
            setSelectedProducts(productData); // Hiển thị 6 sản phẩm đầu tiên
        } else if (buttonType === 'hot') {
            setSelectedProducts(productData.slice(4, 12)); // Hiển thị 6 sản phẩm tiếp theo (giả sử có 12 sản phẩm)
        } else if (buttonType === 'highlyRated') {
            setSelectedProducts(productData.slice(0, 4)); // Thay đổi logic nếu cần cho sản phẩm được đánh giá cao
        }
        setActiveButton(buttonType); 
    };

    return (
        <div className='container mt-4 main-content'>
            <div className="product-buttons">
                <button
                    className={`btn ${activeButton === 'new' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('new')}
                >
                    ⏰ New product
                </button>
                <button
                    className={`btn ${activeButton === 'hot' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('hot')}
                >
                    🔥 Hot product
                </button>
                <button
                    className={`btn ${activeButton === 'highlyRated' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('highlyRated')}
                >
                    🌟 Highly rated
                </button>
            </div>

            <div className='row'>
                {selectedProducts.map((product) => ( // Hiển thị các sản phẩm đã chọn
                    <div className="col-md-3 product-card" key={product.id}>
                        <div className="card">
                            <img className="card-img-top" src={product.image} alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="price">{product.price}</p>
                                <div className="card-bottom">
                                    <button className="btn view-detail-btn">View details</button>
                                    <button className="btn like-btn">
                                        <box-icon name='heart' type='solid' color='var(--secondary-color)'></box-icon>
                                        Like
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
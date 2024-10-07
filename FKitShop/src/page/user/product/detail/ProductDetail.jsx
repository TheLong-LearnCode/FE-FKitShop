import React, { useState, useEffect } from 'react'
import '../../../../util/GlobalStyle/GlobalStyle.css'
import { useParams } from 'react-router-dom'
import { GET } from '../../../../constants/httpMethod';
import api from '../../../../config/axios';
import './ProductDetail.css'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../../redux/slices/cartSlice'

export default function ProductDetail() {
    const [product, setProduct] = useState(null); // Khởi tạo là null thay vì mảng rỗng
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState('descript');
    const [selectedImage, setSelectedImage] = useState('');

    const { productID } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await api[GET](`product/${productID}`);
                setProduct(response.data.data);
                setSelectedImage(response.data.data.images[0].url); // Đặt ảnh đầu tiên làm ảnh được chọn
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productID]);

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className='fixed-header'>
            <div className="container mt-4 pb-4" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <div className="row">
                    <div className="col-md-6 mt-4 " key={product.productID}>
                        <img style={{ objectFit: 'contain', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '10px', height:'300px', width:'100%' }} src={selectedImage} alt={product.name} className="img-fluid" />
                        <div className="row mt-4">
                            {product.images.map((image, index) => (
                                <div className="col-3 pr-0 mb-2 product-detail-subimg" key={index}>
                                    <img src={image.url} alt={`Image ${index + 1}`} className="img-fluid" style={{ objectFit: 'contain', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '10px', height:'150px', width:'100%' }} onClick={() => setSelectedImage(image.url)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <h2 className='text-center' style={{ color: '#000F8F', fontWeight: '500' }}>{product.name}</h2>
                        <div className="row ">
                            <div className="col-md-5  mt-2">
                                <p><strong>Type:</strong> {product.type}</p>
                                <p><strong>Sold:</strong> {product.unitOnOrder}</p>
                            </div>
                            <div className="col-md-5 mt-2">
                                <p><strong>Status:</strong> {product.status}</p>
                                <p><strong>Publisher:</strong> {product.publisher}</p>
                            </div>
                        </div>
                        <h3 style={{ color: '#B43F3F' }}>{formatCurrency(product.price)}</h3>
                        <button className="btn btn-block mb-2 atc-btn" onClick={() => dispatch(addProduct(product))}>Add to cart</button>
                    </div>
                </div>
            </div>

            <div className="container mt-4" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <div className="product-detail-buttons">
                    <button
                        className={`btn ${activeButton === 'descript' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('descript')}
                    >
                        Description
                    </button>
                    {product.type === 'kit' &&
                        <button
                            className={`btn ${activeButton === 'lab' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('lab')}
                        >
                            Related labs
                        </button>
                    }
                </div>

                {activeButton === 'descript' &&
                    <div className="product-detail-content">
                        <p>{product.description}</p>
                        <p><strong>Weight:</strong> {product.weight}</p>
                        <p><strong>Dimension:</strong> {product.dimension}</p>
                        <p><strong>Material:</strong> {product.material}</p>
                        <div className="row mt-4 pb-4">
                            {product.images.slice(2).map((image, index) => (
                                <div className="col-3 pr-0" key={index}>
                                    <img src={image.url} alt={`Image ${index + 1}`} className="img-fluid" style={{ objectFit: 'contain', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '10px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {activeButton === 'lab' &&
                    <div className="product-detail-content">
                        <h3>Related Labs</h3>
                        {/* Thêm nội dung cho phần Related Labs ở đây */}
                    </div>
                }
            </div>
        </div>
    )
}
// import React, { useState, useEffect } from 'react'
// import 'boxicons'
// import './CardContent.css'
// import { GET } from '../../../../constants/httpMethod';
// import api from '../../../../config/axios';

// export default function CardContent() {

//     const [products, setProducts] = useState([]); // Trạng thái để lưu danh sách sản phẩm
//     const [loading, setLoading] = useState(true); // Trạng thái để theo dõi quá trình tải dữ liệu
//     const [error, setError] = useState(null); // Trạng thái để lưu lỗi nếu có

//     const [selectedProducts, setSelectedProducts] = useState(); // Mặc định hiển thị 6 sản phẩm đầu tiên
//     const [activeButton, setActiveButton] = useState('new');

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await api[GET]("product/products");
//                 setProducts(response.data.data); // Lưu dữ liệu vào trạng thái

//             } catch (err) {
//                 setError(err); // Lưu lỗi nếu có
//             } finally {
//                 setLoading(false); // Đặt loading thành false sau khi hoàn thành
//             }
//         };

//         fetchProducts(); // Gọi hàm để lấy dữ liệu
//     }, []); // Chạy một lần khi component được mount

//     if (loading) return <div>Loading...</div>; // Hiển thị loading khi đang tải
//     if (error) return <div>Error: {error.message}</div>; // Hiển thị lỗi nếu có



//     const handleButtonClick = (buttonType) => {
//         if (buttonType === 'new') {
//             setSelectedProducts(products); // Hiển thị 6 sản phẩm đầu tiên
//         } else if (buttonType === 'hot') {
//             setSelectedProducts(products.slice(4, 10)); // Hiển thị 6 sản phẩm tiếp theo (giả sử có 12 sản phẩm)
//         } else if (buttonType === 'highlyRated') {
//             setSelectedProducts(products.slice(0, 4)); // Thay đổi logic nếu cần cho sản phẩm được đánh giá cao
//         }
//         setActiveButton(buttonType);
//     };

//     console.log(products);
//     return (
//         <div className='container mt-4 main-content'>
//             <div className="product-buttons">
//                 <button
//                     className={`btn ${activeButton === 'new' ? 'active' : ''}`}
//                     onClick={() => handleButtonClick('new')}
//                 >
//                     ⏰ New product
//                 </button>
//                 <button
//                     className={`btn ${activeButton === 'hot' ? 'active' : ''}`}
//                     onClick={() => handleButtonClick('hot')}
//                 >
//                     🔥 Hot product
//                 </button>
//                 <button
//                     className={`btn ${activeButton === 'highlyRated' ? 'active' : ''}`}
//                     onClick={() => handleButtonClick('highlyRated')}
//                 >
//                     🌟 Highly rated
//                 </button>
//             </div>

//             <div className='row'>
//                 {products.map(product => ( // Hiển thị các sản phẩm đã chọn
//                     <div className="col-md-3 product-card" key={product.id}>
//                         <div className="card">
//                             <img className="card-img-top" src={product.image} alt={product.name} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{product.name}</h5>
//                                 <p className="price">{product.price}</p>
//                                 <div className="card-bottom">
//                                 <Link to={`/detail/${product.id}`}><button className="btn view-detail-btn">View details</button></Link>
//                                     <button className="btn like-btn">
//                                         <box-icon name='heart' type='solid' color='var(--secondary-color)'></box-icon>
//                                         Like
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react'
import 'boxicons'
import './CardContent.css'
import { Link } from 'react-router-dom';

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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
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
                    <div className="col-md-3 product-card" key={product.productID}>
                        <div className="card">
                            <img className="card-img-top" src={product.images[0].url} alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="price">{formatCurrency(product.price)}</p>
                                <div className="card-bottom">
                                    <Link to={`/detail/${product.productID}`}><button className="btn view-detail-btn">View details</button></Link>
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

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './OrderView.css'; // Đảm bảo bạn tạo file CSS này

export default function OrderView() {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        note: ''
    });
    const [errors, setErrors] = useState({});
    const cartProducts = useSelector(state => state.cart.products);
    const navigate = useNavigate();

    // Giả sử bạn có các danh sách này từ API hoặc một nguồn dữ liệu khác
    const provinces = ['Hà Nội', 'TP.HCM', 'Đà Nẵng']; // Thêm các tỉnh/thành phố khác
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        if (cartProducts.length === 0) {
            navigate('/cart');
        }
    }, [cartProducts, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Reset district và ward khi thay đổi province
        if (name === 'province') {
            setFormData(prevState => ({
                ...prevState,
                district: '',
                ward: ''
            }));
            // Cập nhật danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
            setDistricts(getDistrictsForProvince(value));
            setWards([]);
        }

        // Reset ward khi thay đổi district
        if (name === 'district') {
            setFormData(prevState => ({
                ...prevState,
                ward: ''
            }));
            // Cập nhật danh sách phường/xã dựa trên quận/huyện được chọn
            setWards(getWardsForDistrict(value));
        }
    };

    // Hàm giả định để lấy danh sách quận/huyện cho tỉnh/thành phố
    const getDistrictsForProvince = (province) => {
        // Thay thế bằng logic thực tế để lấy danh sách quận/huyện
        return ['Quận 1', 'Quận 2', 'Quận 3'];
    };

    // Hàm giả định để lấy danh sách phường/xã cho quận/huyện
    const getWardsForDistrict = (district) => {
        // Thay thế bằng logic thực tế để lấy danh sách phường/xã
        return ['Phường 1', 'Phường 2', 'Phường 3'];
    };

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.email = formData.email ? "" : "Email is required";
        tempErrors.fullName = formData.fullName ? "" : "Full name is required";
        tempErrors.phoneNumber = formData.phoneNumber ? "" : "Phone number is required";
        tempErrors.address = formData.address ? "" : "Address is required";
        tempErrors.province = formData.province ? "" : "Province is required";
        tempErrors.district = formData.district ? "" : "District is required";
        tempErrors.ward = formData.ward ? "" : "Ward is required";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form is valid', formData);
            // Proceed with order submission
        } else {
            console.log('Form is invalid');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const subtotal = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    const shipping = 35000; // Assuming fixed shipping cost
    const total = subtotal + shipping;

    return (
        <div className="container mt-2">
            <div className='text-center' style={{width:'100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
                <h1 className="mb-4">YOUR ORDER</h1>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <h2>Delivery Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Full name*"
                                required
                            />
                            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone number*"
                                required
                            />
                            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address*"
                                required
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <select
                                    className={`form-control ${errors.province ? 'is-invalid' : ''}`}
                                    name="province"
                                    value={formData.province}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Province</option>
                                    {provinces.map((province, index) => (
                                        <option key={index} value={province}>{province}</option>
                                    ))}
                                </select>
                                {errors.province && <div className="invalid-feedback">{errors.province}</div>}
                            </div>
                            <div className="col-md-4">
                                <select
                                    className={`form-control ${errors.district ? 'is-invalid' : ''}`}
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.province}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>{district}</option>
                                    ))}
                                </select>
                                {errors.district && <div className="invalid-feedback">{errors.district}</div>}
                            </div>
                            <div className="col-md-4">
                                <select
                                    className={`form-control ${errors.ward ? 'is-invalid' : ''}`}
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.district}
                                >
                                    <option value="">Select Ward</option>
                                    {wards.map((ward, index) => (
                                        <option key={index} value={ward}>{ward}</option>
                                    ))}
                                </select>
                                {errors.ward && <div className="invalid-feedback">{errors.ward}</div>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Note"
                                rows="3"
                            ></textarea>
                        </div>
                        <h2>Payment Method</h2>
                        <div className="mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentMethod" id="onlineBanking" checked />
                                <label className="form-check-label" htmlFor="onlineBanking">
                                    VNPAY 
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentMethod" id="cod" />
                                <label className="form-check-label" htmlFor="cod">
                                    Cash on Delivery (COD)
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100">Pay Now</button>
                    </form>
                </div>
                <div className="col-md-5">
                    <div className="order-summary sticky-top">
                        <h2>Order</h2>
                        {cartProducts.map((product) => (
                            <div key={product.productID} className="d-flex justify-content-between align-items-center mb-2">
                                <div className="d-flex align-items-center">
                                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                    <div>
                                        <h6 className="mb-0">{product.name}</h6>
                                        <small>Quantity: {product.quantity}</small>
                                    </div>
                                </div>
                                <span>{formatCurrency(product.price * product.quantity)}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span>Subtotal ({cartProducts.length} items)</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Shipping</span>
                            <span>{formatCurrency(shipping)}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <strong>Total</strong>
                            <strong>{formatCurrency(total)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
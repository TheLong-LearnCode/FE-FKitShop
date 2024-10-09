import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './OrderView.css'; // Đảm bảo bạn tạo file CSS này
import { getProvinces, getDistricts, getWards, calculateShippingFee } from '../../../service/ghnApi';

export default function OrderView() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        provinceId: '',
        districtId: '',
        wardCode: '',
        note: ''
    });
    const [errors, setErrors] = useState({});
    const cartProducts = useSelector(state => state.cart.products);
    const navigate = useNavigate();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);

    useEffect(() => {
        if (cartProducts.length === 0) {
            navigate('/cart');
        }
        fetchProvinces();
    }, [cartProducts, navigate]);

    const fetchProvinces = async () => {
        try {
            const data = await getProvinces();
            setProvinces(data);
        } catch (error) {
            console.error('Failed to fetch provinces:', error);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'provinceId') {
            setFormData(prevState => ({ ...prevState, districtId: '', wardCode: '' }));
            fetchDistricts(value);
        } else if (name === 'districtId') {
            setFormData(prevState => ({ ...prevState, wardCode: '' }));
            fetchWards(value);
        }

        if (name === 'wardCode') {
            calculateShipping(formData.districtId, value);
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const data = await getDistricts(provinceId);
            setDistricts(data);
        } catch (error) {
            console.error('Failed to fetch districts:', error);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const data = await getWards(districtId);
            setWards(data);
        } catch (error) {
            console.error('Failed to fetch wards:', error);
        }
    };

    const calculateShipping = async (districtId, wardCode) => {
        try {
            const shippingData = {
                from_district_id: 3694, // ID quận/huyện của shop (ví dụ)
                from_ward_code: '800325', // Mã phường/xã của shop (ví dụ)
                to_district_id: parseInt(districtId),
                to_ward_code: wardCode,
                height: 10, // Chiều cao của gói hàng (cm)
                length: 10, // Chiều dài của gói hàng (cm)
                weight: 1000, // Trọng lượng của gói hàng (gram)
                width: 10, // Chiều rộng của gói hàng (cm)
                insurance_value: cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0), // Giá trị đơn hàng
                service_id: 53320 // ID dịch vụ vận chuyển (có thể thay đổi)
            };
            const fee = await calculateShippingFee(shippingData);
            console.log(fee);
            setShippingFee(fee);
        } catch (error) {
            console.error('Failed to calculate shipping fee:', error);
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.fullName = formData.fullName ? "" : "Full name is required";
        tempErrors.phoneNumber = formData.phoneNumber ? "" : "Phone number is required";
        tempErrors.address = formData.address ? "" : "Address is required";
        tempErrors.provinceId = formData.provinceId ? "" : "Province is required";
        tempErrors.districtId = formData.districtId ? "" : "District is required";
        tempErrors.wardCode = formData.wardCode ? "" : "Ward is required";
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
    const total = subtotal + shippingFee;

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
                                    className={`form-control ${errors.provinceId ? 'is-invalid' : ''}`}
                                    name="provinceId"
                                    value={formData.provinceId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Province</option>
                                    {provinces.map((province) => (
                                        <option key={province.ProvinceID} value={province.ProvinceID}>
                                            {province.ProvinceName}
                                        </option>
                                    ))}
                                </select>
                                {errors.provinceId && <div className="invalid-feedback">{errors.provinceId}</div>}
                            </div>
                            <div className="col-md-4">
                                <select
                                    className={`form-control ${errors.districtId ? 'is-invalid' : ''}`}
                                    name="districtId"
                                    value={formData.districtId}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.provinceId}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district) => (
                                        <option key={district.DistrictID} value={district.DistrictID}>
                                            {district.DistrictName}
                                        </option>
                                    ))}
                                </select>
                                {errors.districtId && <div className="invalid-feedback">{errors.districtId}</div>}
                            </div>
                            <div className="col-md-4">
                                <select
                                    className={`form-control ${errors.wardCode ? 'is-invalid' : ''}`}
                                    name="wardCode"
                                    value={formData.wardCode}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.districtId}
                                >
                                    <option value="">Select Ward</option>
                                    {wards.map((ward) => (
                                        <option key={ward.WardCode} value={ward.WardCode}>
                                            {ward.WardName}
                                        </option>
                                    ))}
                                </select>
                                {errors.wardCode && <div className="invalid-feedback">{errors.wardCode}</div>}
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
                            <span>{formatCurrency(shippingFee)}</span>
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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './OrderView.css'; // Đảm bảo bạn tạo file CSS này
import { getProvinces, getDistricts, getWards } from '../../../service/ghnApi.jsx';
import { IDLE } from '../../../redux/constants/status.js';
import { checkOutOrder, checkOutVNP } from '../../../service/orderService.jsx';
import { log } from 'react-modal/lib/helpers/ariaAppHider.js';
import { verifyToken } from '../../../service/authUser.jsx';
import { usePaymentContext } from '../../../contexts/PaymentContext';



export default function OrderView() {
    const dispatch = useDispatch();
    const [activeLink, setActiveLink] = useState('');
    const [userInfo, setUserInfo] = useState(null); // Lưu trữ thông tin người dùng sau khi verify token
    const [errors, setErrors] = useState({});
    const cartProducts = useSelector(state => state.cart.products);
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [error, setError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const { paymentStatus } = usePaymentContext();
    const [formData3, setFormData3] = useState(null);
    const [orderDR, setOrderDR] = useState(null);


    // Lấy thông tin người dùng từ Redux Store
    const user = useSelector((state) => state.auth);
    console.log("user in PRODUCTDETAIL: ", user);
    const userDataStatus = useSelector((state) => state.auth.data);

    var userToken;
    var userData;
    useEffect(() => {
        console.log("user.data.token: ", user.data?.token);
        if (user.data !== null) {
            userToken = user.data?.token;

        } if (user.status === IDLE && user.data !== null) {
            userToken = user.data;
        }
        console.log("userToken in PRODUCTDETAIL: ", userToken);
        console.log("user.data in PRODUCTDETAIL: ", user.data);


        const fetchUserInfo = async () => {
            try {
                userData = await verifyToken(userToken); // Gọi hàm verifyToken để lấy dữ liệu
                console.log("userData after verify token: ", userData);

                setUserInfo(userData); // Lưu thông tin user vào state
                console.log("userData after SETUSERINFO: ", userData);
                //userData.data -> lấy ra userInfo
            } catch (error) {
                console.error("Error verifying token: ", error);
            }
        };
        fetchUserInfo(); // Gọi API lấy thông tin người dùng
    }, [user.data]); //user.data là thông tin người dùng

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        shippingPrice: '',
        payingMethod: '',
        note: ''
    });

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
        } else if (name === 'wardCode') {
            calculateShipping(formData.provinceId);
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


    const subtotal = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    const total = subtotal + shippingFee;

    const calculateShipping = (provinceId) => {
        // ID của Thành phố Hồ Chí Minh (có thể cần điều chỉnh nếu khác)
        const hcmCityId = "202";
        const shippingFee = provinceId === hcmCityId ? 25000 : 35000;
        setShippingFee(shippingFee);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData2 = {
                accountID: userInfo?.data.accountID,
                name: formData.fullName,
                province: formData.provinceId,
                district: formData.districtId,
                ward: formData.wardCode,
                address: formData.address,
                payingMethod: paymentMethod,
                phoneNumber: formData.phoneNumber,
                shippingPrice: shippingFee,
                note: formData.note
            };

            setFormData3(formData2)

            const orderDetailsRequest = cartProducts.map(cartProduct => ({
                productID: cartProduct.productID,
                quantity: cartProduct.quantity,
            }));

            setOrderDR(orderDetailsRequest);

            if (paymentMethod === 'cod') {
                try {
                    await checkOutOrder(formData2, orderDetailsRequest);
                    navigate('/order-success', { state: { userName: formData.fullName } });
                } catch (error) {
                    console.error("Error placing COD order:", error);
                    // Xử lý lỗi nếu cần
                }
            } else if (paymentMethod === 'vnpay') {
                try {
                    const vnpayResponse = await checkOutVNP(total);
                    // Chuyển hướng người dùng đến trang thanh toán VNPAY
                    window.location.href = vnpayResponse;
                } catch (error) {
                    console.error("Error with VNPAY checkout:", error);
                    // Xử lý lỗi nếu cần
                }
            }
        } else {
            console.log('Form is invalid');
        }

    };

    useEffect(() => {
        if (paymentStatus === 'success' && paymentMethod === 'vnpay') {
            const fetchOrder = async () => {
                try {
                    const response = await checkOutOrder(formData3, orderDR);
                    console.log("RESPONSE.DATAAA: ", response);
                    // Xử lý response nếu cần
                    navigate('/order-success', { state: { userName: formData.fullName } });
                } catch (error) {
                    console.error("Error fetching order:", error);
                    // Xử lý lỗi nếu cần
                }
            };
            fetchOrder();
        }
    }, [paymentStatus, paymentMethod]);



    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };


    return (
        <div className="container mt-2">
            <div className='text-center' style={{ width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
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
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="vnpay"
                                    value="vnpay"
                                    checked={paymentMethod === 'vnpay'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label className="form-check-label" htmlFor="onlineBanking">
                                    VNPAY
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="cod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label className="form-check-label" htmlFor="cod">
                                    Cash on Delivery (COD)
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                        //onClick={handlePayNow}
                        >Pay Now
                        </button>
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
                        <Link to={"/cart"}><box-icon name='chevrons-left' color='#a49898' ></box-icon> Back to your shopping cart</Link>
                    </div>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
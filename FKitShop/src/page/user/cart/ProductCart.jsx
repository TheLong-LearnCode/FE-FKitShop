import React, { useEffect, useState, useTransition } from 'react';
import '../../../util/GlobalStyle/GlobalStyle.css';
import './ProductCart.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateProductInCart, removeProductFromCart } from '../../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { IDLE } from '../../../redux/constants/status';
import { verifyToken } from '../../../service/authUser';

export default function ProductCart() {
    const cartProducts = useSelector(state => state.cart.products);
    const cartStatus = useSelector(state => state.cart.status);
    const dispatch = useDispatch();

    const [isPending, startTransition] = useTransition();
    const [activeLink, setActiveLink] = useState('');
    const [userInfo, setUserInfo] = useState(null); // Lưu trữ thông tin người dùng sau khi verify token
    const navigate = useNavigate();
    //const dispatch = useDispatch()

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


    useEffect(() => {
        if (user && userInfo?.data?.accountID) {
            dispatch(fetchCart(userInfo?.data?.accountID));
        }
    }, [dispatch, user, userInfo]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleIncreaseQuantity = (product) => {
        dispatch(updateProductInCart({
            accountID: userInfo?.data?.accountID,
            productID: product.productID,
            quantity: product.quantity + 1
        })).then(() => {
            dispatch(fetchCart(userInfo?.data?.accountID)); // Lấy giỏ hàng đã cập nhật sau khi thay đổi số lượng
        });
    };
    
    const handleDecreaseQuantity = (product) => {
        if (product.quantity > 1) {
            dispatch(updateProductInCart({
                accountID: userInfo?.data?.accountID,
                productID: product.productID,
                quantity: product.quantity - 1
            })).then(() => {
                dispatch(fetchCart(userInfo?.data?.accountID)); // Lấy giỏ hàng đã cập nhật sau khi thay đổi số lượng
            });
        }
    };
    
    const handleRemoveProduct = (product) => {
        dispatch(removeProductFromCart({
            accountID: userInfo?.data?.accountID,
            productID: product.productID
        })).then(() => {
            dispatch(fetchCart(userInfo?.data?.accountID)); // Lấy giỏ hàng đã cập nhật sau khi xóa sản phẩm
        });
    };

    if (cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (cartStatus === 'failed') {
        return <div>Error loading cart. Please try again.</div>;
    }

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
                        {cartProducts.map((product) => (
                            <tr key={product.productID}>
                                <td>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <img src={product.image} alt={product.name} className='img-fluid' />
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
                                                    onClick={() => handleDecreaseQuantity(product)}
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
                                                    onClick={() => handleIncreaseQuantity(product)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{formatCurrency(product.price * product.quantity)}</td>
                                <td>
                                    <button className="btn" onClick={() => handleRemoveProduct(product)}>
                                        <box-icon name='trash' type='solid' color='#e30a0a'></box-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-right">
                    <h4>Total amount: {formatCurrency(cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0))}</h4>
                    <Link to={'/order'}><button className="btn btn-primary">Pay</button></Link>

                </div>
            </div>
        </div>
    );
}
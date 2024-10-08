import React, { useEffect, useState, useTransition } from 'react';
import styles from './index.module.css';
import Sidebar from '../Sidebar';
import ProfileInformation from '../Information';
import Purchase from '../Purchase';
import UpdateAccount from '../UpdateAccount';
import ChangePassword from '../ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../../../service/authUser';
import { setUser } from '../../../redux/slices/authSlice'; // Import the action to set user info
import { IDLE } from '../../../redux/constants/status';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('information'); // State to manage the active tab
    const [isPending, startTransition] = useTransition();
    const [userInfo, setUserInfo] = useState(null); // Lưu trữ thông tin người dùng sau khi verify token
    const user = useSelector((state) => state.auth); // Get user state from Redux store
    const dispatch = useDispatch(); // Initialize dispatch
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation(); // Get the current URL location

    var userToken;
    var userData;
    

    console.log("User info in ProfileLayout be4 render:", user);
    useEffect(() => {
        // Check if user status is idle and fetch user info if necessary
        if (user.data !== null) { //user đang truy cập--successfully
            userToken = user.data?.token;
        } if (user.status === IDLE && user.data !== null) {
                userToken = user.data;
                const fetchUserInfo = async () => {
                    try {
                        userData = await verifyToken(userToken); // Call verifyToken to get user data
                        dispatch(setUser(userData));
                        console.log("user in ProfileeLayoutt: ", userData);
                        setUserInfo(userData);
                    } catch (error) {
                        console.error("Error verifying token: ", error);
                    }
                };
                fetchUserInfo(); // Fetch user info
            }
        }, [user.data]); // user.status and user.data are dependencies

    ;
    console.log("User info in ProfileLayout after render:", user);  
    console.log("UserInfo in profilelayout after render: ", userInfo);
       
    //idle
    //user.data

    //success
    //user.data.data
    const userFinalInfo = user.data?.accounts || userInfo?.data;

    // Function to change tab using startTransition
    const handleTabChange = (tabName) => {
        startTransition(() => {
            setActiveTab(tabName);
            navigate(`/user/${tabName}`); // Update the URL when tab changes
        });
    };
    
    // Update the active tab based on the URL path when the component mounts or when the URL changes
    useEffect(() => {
        const path = location.pathname.split('/').pop(); // Get the last part of the URL
        setActiveTab(path || 'information'); // Set the active tab based on the URL
    }, [location.pathname]); // Run this effect whenever the URL changes

    return (
        <div className={styles.ht}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-12 col-xs-12">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                {/* Pass the activeTab and setActiveTab to Sidebar */}
                                <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
                            </div>
                            <div className='col-md-9'>
                                {/* Render the content based on the activeTab */}
                                {/* lần đầu vào -> user.data?.accounts , khi load lại trang -> user.data?.data */}
                                {activeTab === 'information' && <ProfileInformation userInfo={userFinalInfo} />}
                                {activeTab === 'purchase' && <Purchase userInfo={userFinalInfo}/>}
                                {activeTab === 'updateAccount' && <UpdateAccount userInfo={userFinalInfo}/>}
                                {activeTab === 'changePassword' && <ChangePassword userInfo={userFinalInfo}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState, useTransition } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

import Sidebar from '../Sidebar';

import ProfileInformation from '../Information';
import Purchase from '../Purchase';
import UpdateAccount from '../UpdateAccount';
import ChangePasssword from '../ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../../../service/authUser';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/slices/authSlice'; // Import the action to set user info
import { IDLE } from '../../../redux/constants/status';

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('information'); // State to manage the active tab
    const [isPending, startTransition] = useTransition();
    const [userInfo, setUserInfo] = useState(null); // Store user info after verifying token
    const [activeLink, setActiveLink] = useState('');
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch(); // Initialize dispatch

    useEffect(() => {
        // Check if user status is idle
        if (user.status === IDLE) {
            const fetchUserInfo = async () => {
                try {
                    const userData = await verifyToken(user.data?.data?.token); // Call verifyToken to get data
                    dispatch(setUser(userData)); // Dispatch action to update Redux store with user info
                } catch (error) {
                    console.error("Error verifying token: ", error);
                }
            };
            fetchUserInfo(); // Call API to get user information
        } else if (user.data && user.data.data) {
            setUserInfo(user.data.data); // If user is not idle, set user info from store
        }
    }, [user.data, user.status, dispatch]); // user.data and user.status are dependencies

    console.log("user in ProfileLayout: ", user);

    // Function to change tab using startTransition
    const handleTabChange = (tabName) => {
        startTransition(() => {
            setActiveTab(tabName);
        });
    };

    return (
        <>
            <div className={styles.ht}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-12 col-xs-12">
                            <div>
                                <div className="row">
                                    <div className="col-md-3 border-right">
                                        {/* Pass the activeTab and setActiveTab to Sidebar */}
                                        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
                                    </div>
                                    <div className='col-md-9'>
                                        {/* Render the content based on the activeTab */}
                                        {activeTab === 'information' && <ProfileInformation userInfo={user.data?.data.accounts} />}
                                        {/* {activeTab === 'information' && <ProfileInformation />} Pass userInfo if needed */}
                                        {activeTab === 'purchase' && <Purchase />}
                                        {activeTab === 'updateAccount' && <UpdateAccount />}
                                        {activeTab === 'changePassword' && <ChangePasssword />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

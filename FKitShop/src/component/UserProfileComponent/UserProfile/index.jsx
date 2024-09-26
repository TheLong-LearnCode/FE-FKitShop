import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

import ProfileSidebar from '../ProfileSidebar';
import ProfileInformation from '../ProfileInformation';
import Purchase from '../Purchase'; // Assuming you have a component for Purchase information

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('information'); // State to manage the active tab

    // Combine classes using clsx
    const classes = clsx('profile-form', 'bg-white', 'p-4', 'rounded', 'card-shadow');

    return (
        <>
            <div className={styles.ht}>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-10">
                            <div className={classes}>
                                <div className="row">
                                    <div className="col-md-4 border-right">
                                        {/* Pass the activeTab and setActiveTab to ProfileSidebar */}
                                        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </div>
                                    <div className="col-md-8">
                                        {/* Render the content based on the activeTab */}
                                        {activeTab === 'information' && <ProfileInformation />}
                                        {activeTab === 'purchase' && <Purchase />}
                                        {/* {activeTab === 'updateAccount' && <div>Update Account Form</div>} */}
                                        {/* {activeTab === 'changePassword' && <div>Change Password Form</div>} */}
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


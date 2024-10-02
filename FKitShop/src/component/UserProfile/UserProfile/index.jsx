import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

import Sidebar from '../Sidebar';

import ProfileInformation from '../Information';
import Purchase from '../Purchase';
import UpdateAccount from '../UpdateAccount';
import ChangePasssword from '../ChangePassword';

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('information'); // State to manage the active tab

    // Combine classes using clsx
    const classes = clsx('profile-form', 'bg-white', 'p-4', 'rounded', 'card-shadow');

    return (
        <>
            <div className={styles.ht}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-12 col-xs-12">
                            <div className={classes}>
                                <div className="row">
                                    <div className="col-md-3 border-right">
                                        {/* Pass the activeTab and setActiveTab to Sidebar */}
                                        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </div>
                                    <div className='col-md-9'>
                                        {/* Render the content based on the activeTab */}
                                        {activeTab === 'information' && <ProfileInformation />}
                                        {activeTab === 'purchase' && <Purchase />}
                                        {activeTab === 'updateAccount' && <UpdateAccount/>}
                                        {activeTab === 'changePassword' && <ChangePasssword/>}
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


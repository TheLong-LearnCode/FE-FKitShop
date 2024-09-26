import styles from './index.module.css';
// UserProfile.js
import React from 'react';
import clsx from 'clsx';

import ProfileSidebar from '../ProfileSidebar';
import ProfileInformation from '../ProfileInformation';

export default function UserProfile() {
    // Combine classes using clsx
    const classes = clsx('profile-form', 'bg-white', 'p-4', 'rounded', 'card-shadow');

    return (
        <>
            <div className={styles.ht}>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-10">
                            {/* Use clsx combined classes */}
                            <div className={classes}>
                                <div className="row">
                                    <div className="col-md-4 border-right">
                                        <ProfileSidebar />
                                    </div>
                                    <div className="col-md-8">
                                        <ProfileInformation />
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

import React, { useEffect } from 'react';
// import clsx from 'clsx';
import styles from './index.module.css';
import Validator from '../../Validator'; // Ensure this import points to the correct path

export default function ChangePassword() {
    const passwordLength = 6; // Example password length, adjust if necessary
    useEffect(() => {
        Validator({
            form: '#form-change-password',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.minLength('#newPassword', passwordLength, `Please enter at least ${passwordLength} characters`),
                Validator.isConfirmed('#password_confirmation', function () {
                    return document.querySelector('#form-change-password #newPassword').value;
                }, 'Passwords do not match')
            ],
            onSubmit: function (data) {
                console.log('Change Password Data:', data);
                fetch('/api/change-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((result) => console.log('Success:', result))
                    .catch((error) => console.error('Error:', error));
            },
        });
    }, []);

    return (
        <div className={`${styles.ht} ${styles.wd}`}>
            <form id="form-change-password">
                <div className="form-group">
                    <label htmlFor="currentPassword"><strong>Current Password</strong></label>
                    <div className='col-md-5'>
                        <input type="password" className="form-control" id="currentPassword" />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword"><strong>New Password</strong></label>
                    <div className='col-md-5'>
                        <input type="password" className="form-control" id="newPassword" />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirmation"><strong>Confirm Password</strong></label>
                    <div className='col-md-5'>
                        <input type="password" className="form-control" id="password_confirmation" />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className={`${styles.btnCustom}`}>
                    <button type="submit" className="btn btn-outline-success btn-custom col-md-3">
                        Save
                    </button>
                </div>
            </form>
        </div >
    );
}

import React, { useEffect } from 'react';
// import clsx from 'clsx';
import styles from './index.module.css';
import Validator from '../../Validator'; // Ensure this import points to the correct path
import { PASSWORD_LENGTH } from '../../../constants/fomConstrant';

export default function ChangePassword({ id }) {
    const passwordLength = 6; // Example password length, adjust if necessary

    useEffect(() => {
        Validator({
            form: '#form-change-password',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.minLength('#currentPassword', PASSWORD_LENGTH, ''),
                Validator.minLength('#newPassword', PASSWORD_LENGTH, ''),
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
                <div className="form-group row align-items-center"> {/* Add align-items-center class here */}
                    <label className="col-md-3 col-form-label" htmlFor="currentPassword">
                        <strong>Current Password</strong>
                    </label>
                    <div className="col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            placeholder="Enter your current password"
                        />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className="form-group row align-items-center"> {/* Add align-items-center class here */}
                    <label className="col-md-3 col-form-label" htmlFor="newPassword">
                        <strong>New Password</strong>
                    </label>
                    <div className="col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter your new password"
                        />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className="form-group row align-items-center"> {/* Add align-items-center class here */}
                    <label className="col-md-3 col-form-label" htmlFor="password_confirmation">
                        <strong>Confirm Password</strong>
                    </label>
                    <div className="col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="password_confirmation"
                            placeholder="Confirm your new password"
                        />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className={`${styles.btnCustom}`}>
                    <button type="submit" className="btn btn-outline-success btn-custom col-md-3">
                        Save
                    </button>
                </div>
            </form>

        </div>
    );
}

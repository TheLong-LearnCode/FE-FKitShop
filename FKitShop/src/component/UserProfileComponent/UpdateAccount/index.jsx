import React, { useState, useEffect } from 'react';
import Validator from "../../Validator";
import styles from './index.module.css';
import clsx from 'clsx';

export default function UpdateAccountForm() {
    const [yob, setYob] = useState('');
    const [isDateType, setIsDateType] = useState(false);

    useEffect(() => {
        Validator({
            form: '#form-update-account',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isValidDate('#yob', ''),
                Validator.isPhoneNumber('#phone', '', 10), // Provide totalDigitsPhoneNumber value
                Validator.isEmail('#email'),
                Validator.minLength('#password', 6), // Provide passwordLength value
            ],
            onSubmit: function (data) {
                console.log('Sign Up Data:', data);
                fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((result) => console.log('Success:', result))
                    .catch((error) => console.error('Error:', error));
            }
        });
    }, []); // Empty dependency array to run only once

    const handleYobChange = (event) => {
        setYob(event.target.value);
    };

    return (
        <div className={clsx(styles.wd)}>
            <h4 className="text-center">Update account</h4>
            <form id="form-update-account">
                <div className="form-group row">
                    <label htmlFor="fullname" className="col-md-3 col-form-label">Full Name</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control" id="fullname" placeholder="Full Name" />
                        <span className="form-message"></span>

                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="yob" className="col-md-3 col-form-label">Date of birth</label>
                    <div className="col-md-5">
                        <input
                            id="yob"
                            name="yob"
                            type={isDateType || yob ? 'date' : 'text'}
                            className="form-control"
                            placeholder="Date of birth"
                            onFocus={() => setIsDateType(true)}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    setIsDateType(false);
                                    e.target.placeholder = 'Date of birth';
                                }
                            }}
                            value={yob}
                            onChange={handleYobChange}
                        />
                        <span className="form-message"></span>

                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="phone" className="col-md-3 col-form-label">Phone number</label>
                    <div className="col-md-5">
                        <input type="tel" className="form-control" id="phone" placeholder="Phone number" />
                        <span className="form-message"></span>

                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-md-3 col-form-label">Email</label>
                    <div className="col-md-5">
                        <input type="email" className="form-control" id="email" placeholder="Email" />
                        <span className="form-message"></span>

                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-dark col-md-2">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

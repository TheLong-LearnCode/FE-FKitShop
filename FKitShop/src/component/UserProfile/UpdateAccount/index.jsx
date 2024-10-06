import React, { useState, useEffect } from 'react';
import Validator from "../../Validator";
import styles from './index.module.css';
import clsx from 'clsx';
import { format } from 'date-fns';
import { updateUser } from '../../../service/authUser';
import Warning from './Warning';


export default function UpdateAccountForm({ userInfo }) {
    // const [dob, setDob] = useState('');
    const [isDateType, setIsDateType] = useState(false);

    const dobFormat = format(userInfo.dob, 'yyyy-MM-dd');
    // console.log("dobFormat", dobFormat);

    const [fullName, setFullName] = useState(userInfo.fullName);
    const [email, setEmail] = useState(userInfo.email);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
    const [dob, setDob] = useState(dobFormat);

    const handleDobChange = (event) => {
        setDob(event.target.value);
    };

    useEffect(() => {
        Validator({
            form: '#form-update-account',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.updateFullName('#fullName', userInfo.fullName, 'Please enter a valid full name!!'),
                Validator.isRequired('#fullName', 'Please enter full name'),

                Validator.updateDateOfBirth('#dob', userInfo.dob, ''),
                Validator.isValidDate('#dob', ''),

                Validator.updatePhoneNumber('#phoneNumber', userInfo.phoneNumber, ''),
                //k cần isRequire vì nếu để trống thì báo lỗi "Start at 0";

                Validator.updateEmail('#email', userInfo.email, 'Please enter a valid email'),
                //k cần isRequire vì nếu để trống thì báo lỗi ở dòng text phía trên;
            ],
            onSubmit: async (rawData) => {
                console.log("rawData: ", rawData);
                const data = {
                    fullName: rawData.fullName || userInfo.fullName,
                    dob: rawData.dob  || userInfo.dob,
                    phoneNumber: rawData.phoneNumber || userInfo.phoneNumber,
                    email: rawData.email || userInfo.email
                };
                console.log("Data: ", data);
                try {
                    const response = await updateUser(data, userInfo.accountID);
                    console.log("response in updateAccount: ", response);
                    
                } catch (error) {
                    
                }
            }

        });
    }, []); // Empty dependency array to run only once

    return (
        <div className={clsx(styles.wd)}>
            <h4 className="text-center"><strong>Update account</strong></h4>
            <Warning />
            <form id="form-update-account">
                <div className="form-group row">
                    <label htmlFor="fullname" className="col-md-3 col-form-label">Full Name</label>
                    <div className="col-md-5">
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            placeholder={userInfo.fullName}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)} // Update state
                        />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="dob" className="col-md-3 col-form-label">Date of birth</label>
                    <div className="col-md-5">
                        <input
                            id="dob"
                            name="dob"
                            type={isDateType || dob ? 'date' : 'text'}
                            className="form-control"
                            placeholder={dobFormat}
                            onFocus={() => setIsDateType(true)}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    setIsDateType(false);
                                    e.target.placeholder = `${dobFormat}`;
                                }
                            }}
                            value={dob || dobFormat}
                            onChange={handleDobChange}
                        />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="phone" className="col-md-3 col-form-label">Phone number</label>
                    <div className="col-md-5">
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder={userInfo.phoneNumber}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <span className="form-message"></span>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-md-3 col-form-label">Email</label>
                    <div className="col-md-5">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder={userInfo.email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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

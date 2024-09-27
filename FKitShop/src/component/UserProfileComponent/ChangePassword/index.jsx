// UpdateAccountForm.js
import React, { useState } from 'react';

//import './index.css'

export default function ChangePasssword() {
    const [yob, setYob] = useState(''); // Initialize state for Year of Birth
    const [isDateType, setIsDateType] = useState(false); // Track when the input is of type 'date'

    const handleYobChange = (event) => {
        setYob(event.target.value);
    };

    return (
        <>
            <div>
                <form>
                    <div className="form-group row">
                        <div className='col-md-1'></div>
                        <label htmlFor="fullname" className="col-md-3 col-form-label">Full Name</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" id="fullname" placeholder="Full Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className='col-md-1'></div>
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
                                        e.target.placeholder = 'Date of birth'; //giá trị date of birth cũ
                                    }
                                }}
                                value={yob}
                                onChange={handleYobChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className='col-md-1'></div>
                        <label htmlFor="phone" className="col-md-3 col-form-label">Phone number</label>
                        <div className="col-md-5">
                            <input type="tel" className="form-control" id="phone" placeholder="Phone number" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className='col-md-1'></div>
                        <label htmlFor="email" className="col-md-3 col-form-label">Email</label>
                        <div className="col-md-5">
                            <input type="email" className="form-control" id="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-outline-dark custom-btn">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

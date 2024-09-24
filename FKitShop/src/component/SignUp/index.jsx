import './index.scss';
import React, { useState } from 'react';

function SignUp() {
    const [yob, setYob] = useState(''); // Khởi tạo trạng thái cho Year of Birth
    const [isDateType, setIsDateType] = useState(false); // Trạng thái để theo dõi khi nào input là kiểu 'date'

    const handleYobChange = (event) => {
        setYob(event.target.value);
    };

    return (
        <>
            <form id="form-sign-up">
                <div className="form-group">
                    <input id="fullname" name="fullname" type="text" className="form-control" placeholder="Full name"/>
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input 
                        id="yob"
                        name="yob" 
                        type={isDateType || yob ? 'date' : 'text'} 
                        className="form-control" 
                        placeholder="Year of birth" 
                        onFocus={() => setIsDateType(true)}
                        onBlur={(e) => {
                            if (!e.target.value) {
                                setIsDateType(false);
                                e.target.placeholder = 'Year of birth';
                            }
                        }}
                        value={yob}
                        onChange={handleYobChange}
                    />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="phone" name="phone" type="text" className="form-control" placeholder="Phone number"/>
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="email" name="email" type="email" className="form-control" placeholder="Email"/>
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="password" name="password" type="password" className="form-control" placeholder="Password"/>
                    <span className="form-message"></span>
                </div>
                <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
            </form>
        </>
    );
}

export default SignUp;

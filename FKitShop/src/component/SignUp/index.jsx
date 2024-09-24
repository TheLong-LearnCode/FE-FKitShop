import Validator from "../Validator";
import { useEffect } from "react";

const totalDigitsPhoneNumber = 10;
const passwordLength = 6;

function SignUp() {
    useEffect(() => {
        // Re-initialize validation every time SignUp component is rendered
        Validator({
            form: '#form-sign-up',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#form-sign-up #fullname', 'Please enter your full name'),
                Validator.isRequired('#form-sign-up #yob', 'Please enter your year of birth'),
                Validator.isValidDate('#form-sign-up #yob', ''),
                Validator.isRequired('#form-sign-up #phone', 'Please enter your phone number'),
                Validator.isPhoneNumber('#form-sign-up #phone', '', totalDigitsPhoneNumber),
                Validator.isRequired('#form-sign-up #email', 'Please enter your email'),
                Validator.isEmail('#form-sign-up #email'),
                Validator.isRequired('#form-sign-up #password', 'Please enter your password'),
                Validator.minLength('#form-sign-up #password', passwordLength),
            ],
            onSubmit: function (data) {
                console.log('Sign Up Data:', data);
            }
        });
    }, []); // Ensure validation logic runs whenever SignUp component is mounted

    return (
        <>
            <form id="form-sign-up">
                <div className="form-group">
                    <input id="fullname" type="text" className="form-control" placeholder="Full name" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="yob" type="date" className="form-control" placeholder="Year of birth" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="phone" type="text" className="form-control" placeholder="Phone number" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="email" type="email" className="form-control" placeholder="Email" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="password" type="password" className="form-control" placeholder="Password" />
                    <span className="form-message"></span>
                </div>
                <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
            </form>
        </>
    );
}

export default SignUp;

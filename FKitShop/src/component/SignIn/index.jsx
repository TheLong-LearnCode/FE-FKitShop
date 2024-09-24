import Validator from "../Validator";
import { useEffect } from "react";

function SignIn() {
    useEffect(() => {
        // Re-initialize validation every time SignIn component is rendered
        Validator({
            form: '#form-sign-in',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isEmail('#form-sign-in #email'),
                Validator.minLength('#form-sign-in #password', 6),
            ],
            onSubmit: function (data) {
                console.log('Sign In Data:', data);
            }
        });
    }, []); // Ensure validation logic runs whenever SignIn component is mounted

    return (
        <>
            <form id="form-sign-in">
                <div className="form-group">
                    <input id="email" type="email" className="form-control" placeholder="Email" />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="password" type="password" className="form-control" placeholder="Password" />
                    <span className="form-message"></span>
                </div>
                <button type="submit" className="btn btn-dark btn-block">Sign In</button>
            </form>
        </>
    );
}

export default SignIn;

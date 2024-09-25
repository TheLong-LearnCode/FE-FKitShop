import { useState } from "react";
import GoogleButton from "../GoogleButton";
function SignIn() {

    // Sử dụng state để lưu giá trị các input
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     const formData = {
    //         email: email,
    //         password: password,
    //     };

    //     //Kiểm tra dữ liệu khi submit
    //     console.log("Sign In Data: ", formData);

    // };

    return (
        <>
            <form id="form-sign-in">
                <div className="form-group">
                    <input id="email" name="email" type="text" className="form-control" placeholder="Email"/>
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="password" name="password" type="password" className="form-control" placeholder="Password"/>
                    <span className="form-message"></span>
                </div>
                <button type="submit" className="btn btn-dark btn-block">Sign In</button>
                <GoogleButton prop="signin" />
            </form>
        </>
    );

    // return (
    //     <>
    //         <form id="form-sign-in" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <input id="email" type="email" className="form-control" placeholder="Email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                 />
    //                 <span className="form-message"></span>
    //             </div>
    //             <div className="form-group">
    //                 <input id="password" type="password" className="form-control" placeholder="Password"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)} />
    //                 <span className="form-message"></span>
    //             </div>
    //             <button type="submit" className="btn btn-dark btn-block">Sign In</button>
    //         </form>
    //     </>
    // );
}

export default SignIn;

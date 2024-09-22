function SignUp(){
    return (
        <>
            <form id="form-sign-up">
                <div className="form-group">
                    <input id="fullname" type="text" className="form-control" placeholder="Full name" />
                    <span class="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="yob" type="text" className="form-control" placeholder="Year of birth" />
                    <span class="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="phone" type="text" className="form-control" placeholder="Phone number" />
                    <span class="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="email" type="email" className="form-control" placeholder="Email" />
                    <span class="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="password" type="password" className="form-control" placeholder="Password" />
                    <span class="form-message"></span>
                </div>
                <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
            </form>
        </>
    )
}

export default SignUp
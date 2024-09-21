function SignIn() {
    return (
        <>
            <form id="form-sign-in">
                <div className="form-group">
                    <input id="email" type="email" className="form-control" placeholder="Email" />
                    <span class="form-message"></span>
                </div>
                <div className="form-group">
                    <input id="password" type="password" className="form-control" placeholder="Password" />
                    <span class="form-message"></span>
                </div>
                <button type="submit" className="btn btn-dark btn-block">Sign In</button>
            </form>
        </>
    )
}

export default SignIn
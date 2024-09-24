import './index.scss';
function GoogleButton({ prop }) {
    return (
        <>
            <div className="mt-3 text-center">
                <button className="btn btn-light btn-block google-signin-btn">
                        <img className="google-icon" src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
                        <span>{prop === 'signin' ? "Sign in with Google" : "Sign up with Google"}</span>
                </button>
            </div>
        </>
    )

}

export default GoogleButton;
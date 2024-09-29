import './index.scss';
import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function GoogleButton({prop}) {
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try{
                const res = await axios.get(
                    `https://www.googleapis.com/oauth2/v3/userinfo`,
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                )
                console.log(res.data)
            } catch (error) {
                console.error(error);
            }
        },
      });

    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse.access_token),
    //   });
    return (
        <>
            <div className="mt-3 text-center">
                <button className="btn btn-light btn-block google-signin-btn" onClick={() => login()}>
                        <img className="google-icon" src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
                        <span>{prop === 'signin' ? "Sign in with Google" : "Sign up with Google"}</span>
                </button>
            </div>
        </>
    )

}

export default GoogleButton;
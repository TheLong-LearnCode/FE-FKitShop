import './index.css';
import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import axios from 'axios';


function GoogleButton() {
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
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
            <div className="mt-3">
                <button className="btn btn-google" onClick={() => login()}>
                    <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg" alt="Google logo"/>
                    <span>Google</span>
                </button>
            </div>

        </>
    )

}

export default GoogleButton;
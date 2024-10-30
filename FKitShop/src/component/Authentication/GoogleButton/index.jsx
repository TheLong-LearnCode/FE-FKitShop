import './index.css';
import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../../../config/axios';
import { POST } from '../../../constants/httpMethod';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromCookie } from "../../../service/authUser.jsx"



function GoogleButton() {
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginGG = useGoogleLogin({
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
                setUserData(res.data)
            } catch (error) {
                console.error(error);
            }
        },
    });

    useEffect(() => {
        const loginGoggle = async (email, name, picture) => {
            try {
                const response = await api[POST](`/auth/login-google`, { email, name, picture });
                Cookies.set('token', response.data.data.token);
                const token = Cookies.get("token");
                dispatch(loadUserFromCookie(token));
                navigate('/user/information');
            } catch (err) {
                console.error("Error fetching lab details: ", err);
            }
        }
        loginGoggle(userData.email, userData.name, userData.picture);
    }, [userData])

    return (
        <>
            <div className="mt-3">
                <button className="btn btn-google" onClick={() => loginGG()}>
                    <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg" alt="Google logo" />
                    <span>Google</span>
                </button>
            </div>

        </>
    )

}

export default GoogleButton;
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import Footer from './layouts/user/Footer/Footer.jsx'
import routes from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="837752866445-nm1iiab34qppfleb93s7acd032cb8d8t.apps.googleusercontent.com">
      {/* <BrowserRouter> */}
      <RouterProvider router={routes}/>
        {/* <App /> */}
      {/* </BrowserRouter> */}
    </GoogleOAuthProvider>;
    {/* <Footer/> */}
  </StrictMode>,
)

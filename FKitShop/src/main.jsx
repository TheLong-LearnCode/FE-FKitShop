import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import routes from './routes/index.jsx'
import { Provider } from 'react-redux';
import store from './redux/store/index.js';
import { PaymentProvider } from './contexts/PaymentContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PaymentProvider>
      <GoogleOAuthProvider clientId="837752866445-nm1iiab34qppfleb93s7acd032cb8d8t.apps.googleusercontent.com">
      <RouterProvider router={routes} />
      </GoogleOAuthProvider>;
      </PaymentProvider>
    </Provider>
  </StrictMode>
)

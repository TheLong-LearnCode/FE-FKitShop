
import { Route, Routes } from 'react-router-dom'
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

import SignInAndSignUp from './page/SignInAndSignUp'
import ViewProfile from './page/ViewProfile/ViewProfile'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import HomePage from './component/HomePage/HomePage'
import ViewUserProfile from './page/ViewUserProfile'



function App() {
  return (
    <>

    <Header/>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signin" element={<SignInAndSignUp />} />
      <Route path="/signup" element={<SignInAndSignUp />} />
      <Route path="/profile" element={<ViewUserProfile />} />
    </Routes>
    

    </>
  )
}

export default App

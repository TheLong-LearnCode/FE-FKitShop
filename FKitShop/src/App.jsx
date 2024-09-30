
import { Route, Routes } from 'react-router-dom'
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import SignInSignUp from './component/Authentication/SignInSignUp/index.jsx'
import Header from './layouts/user/Header/Header.jsx'
import HomePage from './page/user/home/HomePage.jsx'
import ViewUserProfile from './page/user/profile/index.jsx'




function App() {
  return (
    <>
    <Header/>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signin" element={<SignInSignUp />} />
      <Route path="/signup" element={<SignInSignUp />} />
      <Route path="/profile" element={<ViewUserProfile />} />
    </Routes>
    
    </>
  )
}

export default App

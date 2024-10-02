
import { Route, Routes } from 'react-router-dom'
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import SignInSignUp from './component/SignInSignUp'
import Header from './layouts/User/Header/Header.jsx'
import HomePage from './component/HomePage/HomePage'
import ViewUserProfile from './page/ViewUserProfile'


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

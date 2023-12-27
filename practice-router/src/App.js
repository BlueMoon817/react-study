import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {Routes, Route, Link, Navigate} from "react-router-dom";
import Homepage from './page/Homepage.js';
import Aboutpage from './page/AboutPage.js';
import Productpage from './page/Productpage';
import ProductDetailPage from './page/ProductDetailPage';
import Loginpage from './page/LoginPage';
import Userpage from './page/UserPage';

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  const PrivateRoute=()=>{
    //authenticate 이 false 면 미로그인상태
    // 로그인 상태면 User페이지로 이동 , 미로그인이면 로그인 페이지로 이동
    return authenticate? <Userpage /> : <Navigate to="/login"/>
  }


  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<Aboutpage />}></Route>
        <Route path="/products" element={<Productpage />}></Route>
        <Route path="/products/:id" element={<ProductDetailPage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/user" element={<PrivateRoute />}></Route>
      </Routes>
    </div>
  );
}

export default App;

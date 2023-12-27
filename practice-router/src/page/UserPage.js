import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Userpage = () => {
  const navigate = useNavigate();
  const goProductPage = () => {
    navigate('/products?q=pants');
  }
  return (
    <div>
      <h1>개인정보 페이지</h1>
    </div>
  )
}

export default Userpage;
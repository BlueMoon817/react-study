import React from "react";
import { useNavigate } from 'react-router-dom';

export const Button = ({ btnType, style, name, onFunc, item, disabled, popupFunc}) => {
  const navigate=useNavigate();
  return (
      <button 
        type={btnType} 
        className={`${style}`}
        disabled={disabled}
        onClick={()=>{
          // 버튼에 따라 모달 띄우기
          if(name==="추가"){
            popupFunc(name);
          }else if(name==="계속 쇼핑하기"){
            onFunc(name);
          }else if(name==="장바구니로"){
            onFunc(name);
            navigate('/list');
          }else if(name==="로그인" && item === "login"){
            navigate('/')
          }
          onFunc(item);
        }} 
      >{name}</button>
  )
}

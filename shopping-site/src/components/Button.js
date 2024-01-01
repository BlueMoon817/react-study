import React from "react";
import { useNavigate } from 'react-router-dom';

export const Button = ({ btnType, style, name, onFunc, item, disabled, popupFunc,itemInfo, path}) => {
  const navigate=useNavigate();
  console.log("버튼 렌더링")
  return (
      <button 
        type={btnType} 
        className={`${style}`}
        disabled={disabled}
        onClick={()=>{
          // 버튼에 따라 모달 띄우기
          if(name==="추가"){
            popupFunc(name);
            if(itemInfo.number>1){
              return onFunc(item, itemInfo.number, itemInfo.selectSize);
            }else{
              return onFunc(item,1,itemInfo.selectSize);
            }
          }else if(name==="계속 쇼핑하기"){
            onFunc(name);
          }else if(name==="장바구니로"){
            onFunc(name);
            navigate('/list');
          }else if(name==="로그인" && item === "login"){
            onFunc(item);
            navigate('/');
          }else if(name==="검색"){
            onFunc(path,item);
          }else {
            onFunc(item)
          }
        }} 
      >{name}</button>
  )
}

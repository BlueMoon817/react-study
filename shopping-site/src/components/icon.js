import React from "react";
import { useNavigate } from 'react-router-dom';

export const Icon = ({iconName, iconLabel, inputOb, changeIcon, onFunc, item, authenticate , text}) => {
  const navigate=useNavigate();
  return (
    <span className={`ic ic_${iconName}`} aria-label={iconLabel?iconLabel:""} onClick={()=>{
      // 비밀번호 노출 여부 아이콘 업데이트
      if(iconName==="hidden"){
        changeIcon("view", inputOb, "text");
      }else if(iconName==="view"){
        changeIcon("hidden", inputOb, "password");
      }else if(iconName==="clear" && inputOb.val!==''){
        changeIcon("clear", inputOb, "text", "hide");
      }else if(iconName==="plus"){
        onFunc(item+1);
      }else if(iconName==="minus"){
        if(item>1){
          onFunc(item -1);
        }
      }
      if(iconName==="heart" && authenticate){
        item.state="fill"
        item.name="heart_filled"
        onFunc(item)
      }else if(iconName ==="heart_filled"  && authenticate){
        item.state="empty"
        item.name="heart"
        onFunc(item)
      }else if((iconName ==="heart_filled" ||   iconName==="heart") && !authenticate){
        navigate('/login');
      }
    }}>{text?text:""}</span>
  )
}

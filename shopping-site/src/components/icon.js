import React from "react";
import { useNavigate } from 'react-router-dom';

export const Icon = ({iconName, iconLabel, item, onClick, name}) => {
  return (
    <span className={`ic ic_${iconName}`} aria-label={iconLabel ? iconLabel : ""} onClick={onClick}
      // 비밀번호 노출 여부 아이콘 업데이트
      // if(iconName==="heart" && authenticate){
      //   item.state="fill"
      //   item.name="heart_filled"
      //   onFunc(item)
      // }else if(iconName ==="heart_filled"  && authenticate){
      //   item.state="empty"
      //   item.name="heart"
      //   onFunc(item)
      // }else if((iconName ==="heart_filled" ||   iconName==="heart") && !authenticate){
      //   navigate('/login');
      // }
    >{name ? name :""}</span>
  )
}

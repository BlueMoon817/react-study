import React from "react";

export const Icon = ({iconName, iconLabel, onFunc}) => {
  return (
    <span className={`ic ic_${iconName}`} aria-label={iconLabel} onClick={()=>{
      // 비밀번호 노출 여부 아이콘 업데이트
      if(iconName==="view"){
        onFunc("password");
      }else if(iconName==="hidden"){
        onFunc("text");
      }
    }}></span>
  )
}

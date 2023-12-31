import React from "react";
import { Icon } from './icon';

export const Input= ({inputOb, onFunc, num, changeIcon, opacity})=>{
    return (
      <div className={`input_box${opacity===true?" input_focus":""}`}>
        <input 
          type={inputOb[num].type} 
          className={`input_field ${inputOb[num].style?inputOb[num].style:""}`} 
          placeholder={inputOb[num].guide} 
          onChange={(e)=>{
            onFunc(e,null,inputOb[num], inputOb[num].type)
          }}
          value={inputOb[num].val}
        />
      {
        inputOb[num].sort==="password" && inputOb[num].type==="text"?
        <Icon 
          iconName='view' 
          iconLabel="비밀번호 숨기기"
          changeIcon={changeIcon}
          inputOb={inputOb[num]}
        />
        :(inputOb[num].sort==="password"&& inputOb[num].type==="password"?
        <Icon 
          iconName='hidden' 
          iconLabel="비밀번호 보기"
          changeIcon={changeIcon}
          inputOb={inputOb[num]}
        />
      :(inputOb[num].sort !=="password" && inputOb[num].type==="text"?
        <Icon 
          iconName='clear' 
          iconLabel="삭제하기"
          changeIcon={changeIcon}
          inputOb={inputOb[num]}
        />
      :""))
    }
    </div>
  )
}

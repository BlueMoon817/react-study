import React from "react";
import { Icon } from './icon';

export const Input = ({inputType, guideText, onChangeInputValue, sort, changeIcon}) => {

  return (
    <div className='input_box'>
      <input 
        type={inputType} 
        className={`input_field`} 
        placeholder={guideText} 
        onChange={(e)=>{onChangeInputValue(e, sort)}}
      />
    { sort==="password" && inputType==="text"? 
      <Icon 
        iconName='view' 
        iconLabel="비밀번호 숨기기"
        onFunc={changeIcon}
      />
      :
      (sort==="password"&& inputType==="password"?
       <Icon 
        iconName='hidden' 
        iconLabel="비밀번호 보기"
        onFunc={changeIcon}
      />
      :"")
    }
    </div>
  )
}

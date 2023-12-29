import React from "react";
export const Input = ({inputType, guideText, changeInput, sort}) => {

  return (
    <div className='input_box'>
      <input type={inputType} className={`input_field`} placeholder={guideText} onChange={(e)=>{changeInput(e, sort)}}/>
      {sort=="password"? <span className='ic_view'></span>:""}
    </div>
  )
}

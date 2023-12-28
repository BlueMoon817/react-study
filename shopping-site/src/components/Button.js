import React,{useState} from "react";

export const Button = ({btnType, style, name, passState }) => {
  return (
    <div className='btn_group'>
      <button type={btnType} className={`${style}`} onClick={passState}>{name}</button>
    </div>
  )
}

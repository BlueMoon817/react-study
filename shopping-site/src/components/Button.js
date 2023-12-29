import React from "react";

export const Button = ({ btnType, style, name, startFunc, item }) => {

  return (
    <div className='btn_group'>
      <button type={btnType} className={`${style}`} onClick={item ? function () { startFunc(item) } : startFunc}>{name}</button>
    </div>
  )
}

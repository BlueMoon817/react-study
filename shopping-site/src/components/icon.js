import React from "react";

export const Icon = ({iconName, iconLabel, item, onClick, name}) => {
  return (
    <span 
      className={`ic ic_${iconName}`} 
      aria-label={iconLabel && iconLabel} 
      onClick={() => { return item ? onClick(item, name) : onClick()}}
    >{name && name}</span>
  )
}

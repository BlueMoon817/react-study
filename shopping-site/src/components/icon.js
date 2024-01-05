import React from "react";

export const Icon = ({iconName, iconLabel, item, onClick, name}) => {
  return (
    <span 
      className={`ic ic_${iconName}`} 
      aria-label={iconLabel && iconLabel} 
      onClick={onClick}
    >{name && name}</span>
  )
}

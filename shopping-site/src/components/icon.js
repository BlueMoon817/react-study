import React from "react";
import { useNavigate } from 'react-router-dom';

export const Icon = ({iconName, iconLabel, item, onClick, name}) => {
  return (
    <span className={`ic ic_${iconName}`} aria-label={iconLabel ? iconLabel : ""} onClick={() => { return item ? onClick(item, name) : onClick()}}
    >{name ? name :""}</span>
  )
}

import React from "react";
import '../App.css';
import { useState } from "react";
const Box = (props) =>{
  return (
    <div className={"game_box is_" + props.result}>
      <strong className="game_user">{props.user}</strong>
      <img src={props.item && props.item.ob}/>
      <strong className="game_result">{props.result}</strong>
    </div>
  )
}


export default Box;
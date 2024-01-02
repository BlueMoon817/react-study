import React, {useState} from "react";
import { Icon } from './icon';

export const Input = ({ item, onFunc })=>{
  
  const [stateText, setStateTxt]=useState(null);
    return (
      <div className={`input_box${item&&item.stateIcon==="show"?" input_focus":""}`}>
        <input 
          type={item && item.type}
          className={`input_field${item && item.style}`} 
          placeholder={item &&item.guide}
          value={stateText}
          onChange={(e)=>{
            onFunc({
              input: item,
              val: e.target.value!==null ? e.target.value : ""
            });
            setStateTxt(e.target.value !== null ? e.target.value : "")
          }}
        />
      {
        item &&item.sort === "password" && item.type==="text"?
        <Icon 
          iconName='view' 
          iconLabel="비밀번호 숨기기"
          onClick={() => {
            onFunc({ input: item, state: "view", val: stateText });
          }}
        />
        : (item && item.sort === "password" && item.type==="password"?
        <Icon 
          iconName='hidden' 
          iconLabel="비밀번호 보기"
          onClick={()=>{
            onFunc({ input: item, state: "hidden", val:stateText });
          }}
        />
        : (item && item.sort !== "password" && item.type==="text"?
        <Icon 
          iconName='clear' 
          iconLabel="삭제하기"
          onClick={()=>{
            onFunc({
              input: item,
              val:"",
            });
            setStateTxt("");
          }}
        />
      :""))
    }
    </div>
  )
}

import React, {useState, useRef} from "react";
import { useEffect } from "react";
import { Icon } from './icon';

export const Input = ({ item, onFunc })=>{
  const [stateText, setStateTxt] = useState(null);
  const [checkFocus, setCheckFocus] = useState(false);
  const [toggle, setToggle] = useState(null);
  const inputRef = useRef();

  useEffect(()=> {
    if(toggle!==null){
      setToggle(false);
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, [toggle]);

    return (
      <div 
        className={`input_box${item && item.stateIcon === "show" ? " input_value" : ""}${checkFocus?" input_focus":""}`}
        tabIndex={item.key}
        onFocus={()=>{
          setCheckFocus(true);
          inputRef.current.focus();
        }}
        onBlur={()=>{
          setCheckFocus(false);
        }}
      >
        <input 
          type={item && item.type}
          className={`input_field ${item&&item.style}`} 
          placeholder={item &&item.guide}
          value={stateText}
          onChange={(e)=>{
            onFunc({
              input: item,
              val: e.target.value
            });
            setStateTxt(e.target.value)
          }}
          ref={inputRef}
        />
      {
        item && item.sort === "password" && item.type==="text"?
        <Icon 
          iconName='view' 
          iconLabel="비밀번호 숨기기"
          onClick={() => {
            onFunc({ input: item, state: "view", val: stateText });
            setToggle(true);
          }}
        />
        : (item && item.sort === "password" && item.type==="password"?
        <Icon 
          iconName='hidden' 
          iconLabel="비밀번호 보기"
          onClick={()=>{
            onFunc({ input: item, state: "hidden", val: stateText });
            setToggle(true);
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

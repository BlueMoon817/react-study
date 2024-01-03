import React, { useState } from "react";
import { Icon } from './icon';
import { Text } from './Text';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { Input } from './input';
export const ModalContentField = ({type, popupFunc, popupInfo}) => {
  const navigate=useNavigate();
  const [checkData, setCheckData]=useState("");
  const saveData=(data)=>{
    setCheckData(data.val)
  }
  const [inputOb, setInputOb]=useState({
    sort:"text", 
    type:"text", 
    val: {checkData}, 
    focus:false, 
    style:"input_edit",
    guide:"수정할 정보를 입력하세요.", 
    icon: "clear",
    stateIcon: "hide"
  })
  return(
    <div className={`popup_content popup_${type.cate}`}>
        <div className='title_box'>
          <Text sort="h3" description={type.messageTxt}/>
          <Text sort="p" description={`변경할 ${type.title}를 입력해주세요`}/>
        </div>
        <div className='edit_info_area'>
          <Input
            onFunc={saveData}
            item={inputOb}
            />
            {
              type.title==="아이디"?          
              <Button 
                btnType="button"
                name="확인"
                style="btn_small"
                onClick={()=>{
            }}
            />:""
            }

        </div>
        <div className='btn_group btn_half'>
          {
            popupInfo.map((item,index)=>(
              <Button 
                key={index}
                btnType="button" 
                style={item.style}
                name={item.name}
                onClick={
                  ()=>{
                    popupFunc({state:item.on.state,  description:item.on.description})
                    if(item.on.path!==null){
                      navigate(item.on.path);
                    }
                  }
                }
                disabled={checkData!==null?checkData:null}
            />
            ))
          }
        </div>
      </div>
  );
}

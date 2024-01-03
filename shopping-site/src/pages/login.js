import React,{useEffect, useState, useRef} from 'react';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { useNavigate } from 'react-router-dom';



export default function Login({loginCheckFunc}) {
  const navigate=useNavigate();
  // input update
  const [inputOb, setInputOb]=useState(
    [
      { key:0, 
        sort:"id", 
        type:"text", 
        val: null, 
        focus: false, 
        guide:"아이디를 입력하세요.", 
        style:" input_text",
        icon: "clear",
        stateIcon: "hide"
      }, 
      { key:1, 
        sort:"password", 
        type:"password", 
        val: null, 
        focus:false, 
        style:"",
        guide:"비밀번호를 입력하세요", 
        icon: "hidden",
        stateIcon: "hide"
      }
    ]);

  // 로그인 상태 업데이트 함수
  const [txtState, setTxtState]= useState('');
  
  // input 업데이트
  const onChangeInput=(item)=>{
    item.input.val = item.val;
    if (item.input.icon === "clear"){
      if(item.val !== '' && item.val !==null) {
        item.input.stateIcon="show"
      }else{
        item.input.stateIcon = "hide"
      }
    } else if(item.state==="view"){
      item.input.stateIcon = "hide"
      item.input.type="password"
    } else if(item.state === "hidden"){
      item.input.stateIcon = "show"
      item.input.type = "text"
    }
    setInputOb([...inputOb]);
  }

  // input 변화 감지
  useEffect(()=>{
    // 에러 메시지
    if(inputOb[0].val!==null && inputOb[1].val!==null){
      if(inputOb[0].val==='' || inputOb[1].val==='' ){
        setTxtState(false);
      }else if(inputOb[0].val!=='' || inputOb[1].val!==''){
        setTxtState(true);
      }
    }
  }, [inputOb]);
  
  return (
    <div className="wrap">
     <div className='content'>
      <div className="inner">
        <Input 
          item={inputOb[0]} 
          onFunc={onChangeInput}
        />
        <Input
          item={inputOb[1]} 
          onFunc={onChangeInput}
        />
        {
          txtState===false? 
          <Text 
            sort="p"
            textType="error" 
            description="아이디와 비밀번호를 다시 입력해주세요"
          /> 
          : ""
        }
        <Button 
          type="button" 
          style="btn btn_full" 
          name="로그인" 
          onClick={()=>{
            if (txtState === true){
              loginCheckFunc({state:"login", path:"/"});
            }else {
              loginCheckFunc({state:"logout"});
            }
           }
          }
          disabled={txtState===true?false:"disabled"}
        />
      </div>
     </div>
    </div>
  );
}
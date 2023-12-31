import React,{useEffect, useState, useRef} from 'react';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { Text } from '../components/Text';



export default function Login({loginCheckFunc}) {
  const [opacity, setOpacity]=useState('');
  const changeIcon=(state, input, inputType, opacity)=>{
    onChangeInput(null, state, input, inputType, opacity);
  }
  // input update
  const [inputOb, setInputOb]=useState(
    [
      { key:0, 
        sort:"id", 
        type:"text", 
        val:null, 
        focus: false, 
        guide:"아이디를 입력하세요.", 
        style:"input_text",
        icon: "clear",
        opacity:{opacity}
      }, 
      { key:1, 
        sort:"password", 
        type:"password", 
        val:null, 
        focus:false, 
        guide:"비밀번호를 입력하세요", 
        style:null,
        icon: "hidden"
      }
    ]);
    

  // 로그인 상태 업데이트 함수
  const [txtState, setTxtState]= useState('');

  // input 업데이트
  const onChangeInput=(e, state, input, inputType, opacity)=>{
      if(e!==null&& opacity!=="hide"){
        input.val=e.target.value;
      }
      if(state!==null){
        input.icon=state;
      }
      if(inputType!==null){
        input.type=inputType;
      }
      if(e===null && opacity==="hide"){
        input.val='';
        setOpacity(false);
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
    // 클리어버튼 상태
    if(inputOb[0].val!==null && inputOb[0].val!==''){
      setOpacity(true);
    }else if((inputOb[0].val!==null && inputOb[0].val==='' && inputOb[1].val!==null)){
      setOpacity(false);
    }
  }, [inputOb]);
  
  return (
    <div className="wrap">
     <div className='content'>
      <div className="inner">
        <Input 
          num="0"
          inputOb={inputOb}
          onFunc={onChangeInput}
          changeIcon={changeIcon}
          opacity={opacity}
        />
        <Input
          num="1"
          inputOb={inputOb}
          onFunc={onChangeInput}
          changeIcon={changeIcon}
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
          onFunc={loginCheckFunc} 
          item={txtState===true?"login":"logout"}
          disabled={txtState===true?false:"disabled"}
        />
      </div>
     </div>
    </div>
  );
}
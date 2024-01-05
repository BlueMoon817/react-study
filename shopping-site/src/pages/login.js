import React,{useEffect, useState, useRef} from 'react';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { useNavigate } from 'react-router-dom';



export default function Login({loginCheckFunc}) {
  const navigate=useNavigate();
  const [loginCount, setLoginCount]=useState(0);
  // input update
  const [inputOb, setInputOb]=useState(
    [
      { key:1, 
        sort:"id", 
        type:"text", 
        val: null, 
        focus: false, 
        guide:"아이디를 입력하세요.", 
        style:"input_text",
        icon: "clear",
        stateIcon: "hide"
      }, 
      { key:2, 
        sort:"password", 
        type:"password", 
        val: null, 
        focus:false, 
        style:"input_text",
        guide:"비밀번호를 입력하세요", 
        icon: "hidden",
        stateIcon: "hide"
      }
    ]);

  const matchUserData=()=>{
    // 존재하는 아이디+비밀번호 일치 -> 유저데이터를 가져오고 로그인상태로 전환
    loginCheckFunc({ state: "login", path: "/" });
    // 존재하는 아이디 + 비밀번호 불일치 -> 경고문구 셋팅 and 로그인 실패횟수 카운트+1
    // ...
    // 존재하지 않는 아이디 -> 회원가입 유도 팝업 띄우기
    //...
  }
  // 에러텍스트 상태 함수
  const [txtState, setTxtState]= useState('');
  
  // input 업데이트
  const onChangeInput = (item)=>{
    item.input.val = item.val;
    if (item.input.icon === "clear"){
      if(item.val !== '' && item.val !==null) {
        item.input.stateIcon = "show"
      }else{
        item.input.stateIcon = "hide"
      }
    } else if(item.state==="view"){
      item.input.stateIcon = "hide";
      item.input.type = "password"
    } else if(item.state === "hidden"){
      item.input.stateIcon = "show";
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
      } else if (
        inputOb[0].val !== '' && 
        inputOb[1].val !== '' && 
        inputOb[1].val.length > 7 && 
        inputOb[0].val.length > 3){
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
            // txtState는 기본적으로 인풋에 value가 있는지를 체크
            if (txtState === true){
              matchUserData({})
            }
           }
          }
          disabled={txtState===true?false:"disabled"}
        />
        <Button 
          type="button" 
          style="btn btn_full" 
          name="회원가입" 
          onClick={()=>{
            navigate('/signup');
           }
          }
        />
        {}
      </div>
     </div>
    </div>
  );
}
import React,{useEffect, useState} from 'react';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { Text } from '../components/Text';


export default function Login({loginCheckFunc}) {
    // input 아이디체크
  const [idVal, setIdVal]=useState(null);
  // input 비밀번호 체크
  const [pwVal, setPwVal]=useState(null);
  // 로그인 상태 업데이트 함수
  const [txtState, setTxtState]= useState('');
  //비밀번호 토글
  const [saveInputType, setInputType]=useState("password");
  //비밀번호 노출 토글 업데이트 함수
  const inputTypeUpdate=(type)=>{
    setInputType(type);
  }
  // input에 value값 체크
  const onChangeInputValue=(e, sort)=>{
    if(sort==='id'){
      setIdVal(e.target.value);
    }else if(sort==='password'){
      setPwVal(e.target.value);
    }
  }

  // input value 값 watching
  useEffect(()=>{
    if(idVal!==null &&pwVal!==null){
      if(idVal.length>0 && pwVal.length>0){
        setTxtState(true);
      }else {
        setTxtState(false);
      }
    }
  }, [idVal,pwVal]);
  
  return (
    <div className="wrap">
     <div className='content'>
      <div className="inner">
        <Input 
          inputType="text" 
          guideText="아이디를 입력하세요." 
          sort="id" 
          onChangeInputValue={onChangeInputValue} 
        />
        <Input 
          inputType={saveInputType}
          guideText="비밀번호를 입력하세요" 
          sort="password" 
          onChangeInputValue={onChangeInputValue} 
          changeIcon={inputTypeUpdate}
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
        />
      </div>
     </div>
    </div>
  );
}
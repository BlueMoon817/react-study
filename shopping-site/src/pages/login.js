import { useState } from 'react';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { useNavigate } from 'react-router-dom';
export default function Login({changeInput, text, setFunc}) {
  return (
    <div className="wrap">
     <div className='content'>
      <div className="inner">
      <Input inputType="text" guideText="아이디를 입력하세요." sort="id" changeInput={changeInput}></Input>
      <Input inputType="password" guideText="비밀번호를 입력하세요" sort="password" changeInput={changeInput}></Input>
      {!text? <Text textType="error" description="아이디와 비밀번호를 다시 입력해주세요"></Text> : ""}
      <Button type="button" style="btn btn_full" name="로그인" passState={setFunc}></Button>
      </div>
     </div>
    </div>
  );
}
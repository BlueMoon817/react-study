import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Input } from './input';
import { Button } from './Button';

export default function Navbar({stateLogin, loginCheckFunc, searchFunc, searchUI}) {
  const [inputOb, setInputOb] = useState([{
    key:0,
    sort:"search",
    type:"text",
    val:null,
    focus:false,
    guide:"검색어를 입력하세요",
    style:"input_search",
    icon:"search",
  }]);
  
  const [keywordTxt,setKeywordText] = useState('');
  const getKeyword=(e, state, input, type)=>{
    input.val=e.target.value;
    setKeywordText(input.val);
    setInputOb([...inputOb]);
  }
  const params=useLocation();
  if(params.pathname!=="/login"){
    return (
      <header className="header">
        {/* stateLogin은 네비게이션에서는 text로 받아온다. 다른 페이지에서는 불리언 값으로 받아오기. */}
          <div className="util_area"><Link to={stateLogin==="로그인"?"/login":"/"} onClick={()=>{
          if(stateLogin==="로그인"){
            loginCheckFunc("login");
          }else if (stateLogin==="로그아웃"){
            loginCheckFunc("logout");
          }
        }} className='text_login'><FontAwesomeIcon icon={faUser} className='ic_user'/>{stateLogin}</Link></div>
          <div className="logo_area"><h1><Link to="/" className="logo"></Link></h1></div>
          <nav className="nav_bar">
            <ul className="list_menu">
              <li className="list_items"><Link to="/" >Home</Link></li>
              <li className="list_items"><Link to="/top" >Top</Link></li>
              <li className="list_items"><Link to="/pants" >Pants</Link></li>
              <li className="list_items"><Link to="/list" >장바구니</Link></li>
              <li className="list_items"><Link to="/info" >My Info</Link></li>
              <li className="list_items"><Link to="/qna" >고객센터</Link></li>
            </ul>
            
        {
          searchUI==="/top" || searchUI ==="pants" || searchUI==="/" ?
          <div className="search_box">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="ic_search"/>
            <Input 
              num="0"
              inputOb={inputOb}
              onFunc={getKeyword}
             />
            <Button type="button" style="btn btn_search" onFunc={searchFunc} item={keywordTxt}
            path={params.pathname}
            name="검색" />
          </div>:""
        }
        </nav>
      </header>)  
  }else if(params.pathname==="/login"){
    return (
        <header className="header">
         <div className="logo_area"><h1><Link to="/login" className="logo"></Link></h1></div>
        </header>
    )
  }
}
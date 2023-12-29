import React from "react";
import {Link, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({name,sendFunc}) {
  const params=useLocation();
  if(params.pathname!=="/login"){
    return (
    <>
      <header className="header">
          <div className="util_area"><Link to={name==='로그인'? 
        "/login" : "/"} onClick={sendFunc}><FontAwesomeIcon icon={faUser} />{name}</Link></div>
          <div className="logo_area"><h1><Link to="/" className="logo"></Link></h1></div>
          <nav className="nav_bar">
            <ul className="list_menu">
              <li className="list_items"><Link to="/">Home</Link></li>
              <li className="list_items"><Link to="/">상의</Link></li>
              <li className="list_items"><Link to="/">하의</Link></li>
              <li className="list_items"><Link to="/list">장바구니</Link></li>
              <li className="list_items"><Link to="/">고객센터</Link></li>
            </ul>
          <div className="search_box"><FontAwesomeIcon icon={faMagnifyingGlass} className="ic_search"/><input className="input_search" type="text"  placeholder="검색어를 입력하세요." /></div>
          </nav>
        </header>
    </>)  
  }else if(params.pathname==="/login"){
    return (
      <>
        <header className="header">
         <div className="logo_area"><h1><Link to="/login" className="logo"></Link></h1></div>
        </header>
      </>
    )
  }
}
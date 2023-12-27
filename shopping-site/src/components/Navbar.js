
import {Link} from "react-router-dom";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const [currState, setCurrState]=useState('로그인');
  const stateLogin=()=>{
    return
  }
  return (
    <>
      <header className="header">
        <div className="util_area"><Link to={stateLogin}><FontAwesomeIcon icon={faUser} />{currState}</Link></div>
        <div className="logo_area"><h1><Link to="/" className="logo">Logo</Link></h1></div>
        <nav className="nav_bar">
          <ul className="list_menu">
            <li className="list_items"><Link to="/">Home</Link></li>
            <li className="list_items"><Link to="/">상의</Link></li>
            <li className="list_items"><Link to="/">하의</Link></li>
            <li className="list_items"><Link to="/">고객센터</Link></li>
          </ul>
        <div className="search_box"><FontAwesomeIcon icon={faMagnifyingGlass} className="ic_search"/><input className="input_search" type="text" placeholder="검색어를 입력하세요." /></div>
        </nav>
      </header>
    </>
  );
}
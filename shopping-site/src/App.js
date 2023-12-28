import logo from './logo.svg';
import {useEffect, useState} from "react";
import './App.css';
import {Routes, Route, Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Navbar from './components/Navbar';
import ProductDetail from './pages/productDetail.js';
function App() {
  // 페이지 클래스 업데이트 변수
  const [urlPath, setClassName] = useState("page-product");
  const {id} = useParams();
  // 로그인여부체크
  const [authenticate, setAuthenticate] = useState(false);
  const PrivatePage=()=>{
    return authenticate? <ProductDetail/> : <Navigate to="/login"/>
  }
  // 현재페이지체크
  const params=useLocation();
  
  // 에러텍스트 유무
  const [text, setText] =useState(true);
  // input 아이디체크
  const [idVal, setIdVal]=useState('');
  // input 비밀번호 체크
  const [pwVal, setPwVal]=useState('');
  // 헤더로그인버튼 
  const [btnText, setBtnText]=useState('로그인');
  // 네비게이트
  let navigate=useNavigate();
  
  // input에 값이 들어오면 로그인 체크를 위해 value 업데이트 
  const onChangeInputValue=(e, sort)=>{
    if(sort==='id'){
      setIdVal(e.target.value);
    }else if(sort==='password'){
      setPwVal(e.target.value);
    }
  }
  
  // 로그인 조건 함수
  const loginCheckFunc=()=>{
    // 여기서 아이디 비밀번호 값을 ajax로 보내서 응답 받고 아래실행문 처리.
    if(idVal.length===0 || pwVal.length===0){
      setText(false);
      setAuthenticate(false);
    }else{
      navigate('/');
      setIdVal('');
      setPwVal('');
      setText(true);
      setBtnText('로그아웃');
      setAuthenticate(true);
    }
  }

  // 페이지 이동시 페이지 클래스 변경
  useEffect(()=>{
    if (params.pathname=="/login"){
      setClassName("page-login");
    }else if (params.pathname == "/"){
      setClassName("page-product");
    }else if(params.pathname == `/product/${id}`){
      setClassName("page-detail");
    }
  }, [params.pathname]);

  return (
    <div className={urlPath}>
      <Navbar  name={btnText} sendFunc={()=>{ setBtnText('로그인'); }}></Navbar>
      <Routes>
        <Route 
          path="/" 
          element={
            <Main/>
          } 
        />
        <Route 
          path="/login" 
          element={ 
            <Login 
              setFunc={loginCheckFunc} 
              text={text} 
              changeInput={onChangeInputValue} 
            /> 
          } 
        />
        <Route 
          path={`/product/${id}`} 
          element={
            <PrivatePage/> 
          }
        />
      </Routes> 
    </div>
  );
}

export default App;

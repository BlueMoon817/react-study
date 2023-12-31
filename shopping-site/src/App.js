import logo from './logo.svg';
import {useEffect, useState} from "react";
import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Navbar from './components/Navbar';
import List from './pages/list';
import PrivatePage from './pages/PrivatePage.js';

function App() {
  // 현재페이지체크
  const paths=useLocation();
  // 페이지 클래스 업데이트 변수
  const [urlPath, setClassName] = useState("page-product");
  // 로그인여부체크
  const [authenticate, setAuthenticate] = useState(false);
  // 로그인버튼 텍스트
  const [btnText, setBtnText]=useState('로그인');
  // 상품 리스트
  const [productList, setProductList] = useState([]);
  // 장바구니 목록
  const [savePdt, setSavePdt] = useState(null);
  // 팝업열림상태
  const [popupState, setPopupState]=useState(false);
  // 팝업 메시지
  const [messageTxt,setMessageTxt] = useState('');
  // 검색
  const [searchList, setSearchList]=useState([]);
  // 검색 발생
  const [searchEvent, setSearchEvent] = useState(null);
  //페이지이동
  const [move, setMove] = useState(0);
  
  //관심 상품목록
  const [likeList, setLikeList] = useState([])
  const updateLikeData= (icon)=>{
    setLikeList([...likeList, icon])
  }
  const moveFunc=(page)=>{
    // 상의 하의 필터
    if(page==="상의" || page==="하의"){
      searchFunc(page);
    }else{
      // 네비에서 상의 하의 이동이 아닌 페이지 이동시 검색리스트 초기화를 위한 업데이트
      let count= move + 1
      setMove(count);
    }
  }
  
  // 로그인 조건 함수 (로그인버튼 텍스트와, 로그인상태값 업데이트)
  const loginCheckFunc=(state)=>{ 
    if(state==="login"){
      setAuthenticate(true);
      setBtnText('로그아웃');
    }else if("logout"){
      setAuthenticate(false);
      setBtnText('로그인');
    }
  }
  
  // 상품리스트 받아오기
  const getProducts = async () => {
    let url = `http://localhost:3004/products`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  }
  
  // 장바구니 목록 업데이트 함수
  const saveProduct = (item, number, size) => {
    // 다차배열을 사용해서 item이 아닌 list에 고유의 key값을 넣어준다.
    //[ [{item}, key], [{item}, key], [{item}, key], [{item}, key] ]
    setSavePdt(function(){
      let save= savePdt?[...savePdt, [item]]:[[item]]
      save[save.length-1].key = Math.random()*1000;
      if(number){
        save[save.length-1].number=number
        save[save.length-1].price=number * item.price
      }
      if(size){
        save[save.length-1].size=size
      }
      return [...save]})
  }
  
  // 장바구니 목록 삭제
  const deleteFunc=(item)=>{
    savePdt.map((saveItem,index)=>{
      if(saveItem.key===item.key){
        savePdt.splice(index,1)
        setSavePdt(savePdt.length>0?[...savePdt]:null)
      }
    })
  }
  
  // 팝업 상태 업데이트함수
  const popupFunc=(name)=>{
    if(name==="추가"){
      // 팝업 띄우기
      setMessageTxt("장바구니에 상품이 추가되었습니다.");
      setPopupState(true);
    }else if(name==="계속 쇼핑하기" || name==="장바구니로" ){
      // 팝업 닫기
      setMessageTxt("");
      setPopupState(false);
    }
  } 
  
  // 상품 받아오기 : 페이지 처음 렌더링시 한번만 실행
  useEffect(() => {
    getProducts();
  }, []);
  
  // 검색
  const searchFunc=(keyword)=>{
    if(keyword!==""){
      let list=[];
      if(keyword==="상의"){
        productList.forEach((item, index)=>{
          if(item.type==="top"){
            list.push(item);
          }
          if(index===productList.length-1){
            setSearchList([...list]);
            setSearchEvent(true);            
          }
        })
      }else if(keyword==="하의"){
        productList.forEach((item, index)=>{
          if(item.type==="pants"){
            list.push(item);
          }
          if(index===productList.length-1){
            setSearchList([...list]);
            setSearchEvent(true);            
          }          
        })
      }else {
        productList.forEach((item, index)=>{
          if(item.title.indexOf(keyword)!==-1){
            list.push(item);
          }
          if(index===productList.length-1){
            if(list.length===0){
              setSearchList("검색결과가 없습니다.");
              setSearchEvent(true);
            }else{
              setSearchList([...list]);
              setSearchEvent(true);
            }
          }
        })        
      }
    }
  }
  
  // 로그인 업데이트 시 
  useEffect(()=>{
    if(authenticate===true){
      loginCheckFunc("login");
    }else{
      loginCheckFunc("logout");
    }
  },[authenticate]);
  
  // 페이지 이동시 페이지 클래스변경, 검색내용 초기화
  useEffect(()=>{
    if (paths.pathname==="/login"){
      setClassName("page-login");
      // 검색내용 초기화
      setSearchEvent(false);
    } else if (paths.pathname === `/list`){
      setClassName("page-list");
      // 검색내용 초기화
      setSearchEvent(false);
    } else if (paths.pathname === "/") {
      setClassName("page-product");
      // 검색내용 초기화
      setSearchEvent(false);
    }else if(paths.pathname === "/info"){
      setClassName("page-myinfo");
      // 검색내용 초기화
      setSearchEvent(false);
    } else {
      setClassName("page-detail");
      // 검색내용 초기화
      setSearchEvent(false);
    }
  }, [move,paths.pathname]);

  return (
    <div className={urlPath}>
      <Navbar  
        stateLogin={btnText} 
        loginCheckFunc={loginCheckFunc}
        searchFunc={searchFunc}
        on={moveFunc}
      ></Navbar>
      <Routes>
        <Route 
          path="/" 
          element={
            <Main 
              productList={searchEvent===true?searchList:productList} 
              saveProduct={saveProduct}
              updateLikeData={updateLikeData}
              authenticate={authenticate}
            />
          } 
        />
        <Route 
          path="/list" 
          element={
            <List 
              list={savePdt} 
              saveProduct={saveProduct} 
              deleteFunc={deleteFunc} 
              productList={productList} 
            />
          } 
        />
        <Route 
          path="/login" 
          element={ 
            <Login 
              stateLogin={authenticate}
              loginCheckFunc={loginCheckFunc} 
            /> 
          } 
        />
        <Route 
          path={`/product/:id`} 
          element={
            <PrivatePage 
              authenticate={authenticate} 
              popupState={popupState} 
              messageTxt={messageTxt} 
              popupFunc={popupFunc}
              productList={productList}
              saveProduct={saveProduct}
              path="product/:id"
            /> 
          }
        />
        <Route 
          path={`/info`} 
          element={
            <PrivatePage
              authenticate={authenticate} 
              popupState={popupState} 
              messageTxt={messageTxt} 
              popupFunc={popupFunc}
              productList={likeList}
              path="info"
            /> 
          }
        />
      </Routes> 
    </div>
  );
}

export default App;

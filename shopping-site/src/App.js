import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
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
  const [btnText, setBtnText] = useState('로그인');
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
  
  // top 상품목록
  const [topList, setTopList]=useState([]);
  // pants 상품 목록
  const [pantsList, setPantsList]=useState([]);
  
  const [updateList, setUpdateList]=useState(false);
  //관심 상품목록
  const [likeList, setLikeList] = useState([]);
  
  const updateLikeData= (icon)=>{
    setLikeList([...likeList, icon]);
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
  const makeList = async() => {
    let url = `http://localhost:3004/products`;
    let response = await fetch(url);
    let data = await response.json();
    let pants=[];
    let top =[];
    data.map((item, index)=>{
      if(item.type==="top"){
        top.push(item);
      }else if(item.type==="pants"){
        pants.push(item)
      }
      if(index === data.length-1){
        setTopList([...top]);
        setPantsList([...pants]);
      }
    })
  }
  
  // 장바구니 목록 업데이트 함수
  const saveProduct = (item, number, size) => {
    // 다차배열을 사용해서 item이 아닌 list에 고유의 key값을 넣어준다.
    //[ [{item}, key], [{item}, key], [{item}, key], [{item}, key] ]
    setSavePdt(function(){
      let save= savePdt?[...savePdt, [item]]:[[item]];
      save[save.length-1].key = Math.random()*1000;
      if(number){
        save[save.length-1].number=number;
        save[save.length-1].price=number * item.price;
      }
      if(size){
        save[save.length-1].size=size;
      }
      return [...save]})
  }
  
  // 장바구니 목록 삭제
  const deleteFunc=(item)=>{
    savePdt.map((saveItem,index)=>{
      if(saveItem.key===item.key){
        savePdt.splice(index,1);
        setSavePdt(savePdt.length>0?[...savePdt]:null);
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
    makeList();
    
  }, []);
  
  // 검색
  const searchFunc=(path, keyword)=>{
    if(keyword){
    let list=[];
    if(path==="/top"){
      topList.map((item, index)=>{
        if(item.title.indexOf(keyword)!==-1){
          list.push(item);
        }
        if(index===topList.length-1){
          if(list.length===0){
            setSearchList("검색결과가 없습니다.");
          }else{
            setSearchList([...list]);
          }
          setUpdateList(true);
        }   
      })
    }else if(path==="/pants"){
      pantsList.map((item, index)=>{
        if(item.title.indexOf(keyword)!==-1){
          list.push(item);
        }
        if(index===pantsList.length-1){
          if(list.length===0){
            setSearchList("검색결과가 없습니다.");
          }else{
            setSearchList([...list]);
          }
          setUpdateList(true);
        }   
      })
    }else if(path==="/"){
      productList.map((item, index)=>{
        if(item.title.indexOf(keyword)!==-1){
          list.push(item);
        }
        if(index===productList.length-1){
          if(list.length===0){
            setSearchList("검색결과가 없습니다.");
          }else{
            setSearchList([...list]);
          }
          setUpdateList(true);
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
      setAuthenticate(false);
    } else if (paths.pathname === `/list`){
      setClassName("page-list");
      setUpdateList(false);
    } else if (paths.pathname === "/" || paths.pathname === "/pants" || paths.pathname === "/top") {
      setUpdateList(false);
      setClassName("page-product");
    }else if(paths.pathname === "/info"){
      setClassName("page-myinfo");
      setUpdateList(false);
    } else {
      setClassName("page-detail");
      setUpdateList(false);
    }
    
  }, [paths.pathname]);

  return (
    <div className={urlPath}>
      <Navbar  
        stateLogin={btnText}
        loginCheckFunc={loginCheckFunc}
        searchFunc={searchFunc}
        searchUI={paths.pathname}
      ></Navbar>
      <Routes>
        <Route 
          path="/"
          element={
            <Main 
              productList={productList}
              saveProduct={saveProduct}
              updateLikeData={updateLikeData}
              authenticate={authenticate}
            />
          } 
        />
        <Route 
          path="/pants"
          element={
            <Main 
              productList={pantsList}
              saveProduct={saveProduct}
              updateLikeData={updateLikeData}
              authenticate={authenticate}
            />
          } 
        />
        <Route 
          path="/top"
          element={
            <Main 
              productList={topList}
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
        <Route 
          path={`/qna`} 
          element={
            <PrivatePage
              authenticate={authenticate} 
              popupState={popupState} 
              messageTxt={messageTxt} 
              popupFunc={popupFunc}
              productList={likeList}
              path="qna"
            /> 
          }
        />
      </Routes> 
    </div>
  );
}

export default App;

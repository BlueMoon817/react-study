import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Navbar from './components/Navbar';
import List from './pages/list';
import PrivatePage from './pages/PrivatePage.js';

function App() {
  // 현재페이지체크
  const paths=useLocation();
  const navigate=useNavigate();
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
  //관심 상품목록
  const [likeList, setLikeList] = useState([]);
  
  const updateLikeData= (icon)=>{
    let list=[];
    productList.map((item, index)=>{
      if(item.id===icon.id){
        item.like.name=icon.name;
        item.like.state=icon.state;
        setProductList([...productList]);
      }
      if(item.like.state){
        list.push(item)
      }
      if(index === productList.length-1){
        setLikeList([...list])
      }
    });
  }
  
  // 로그인 조건 함수 (로그인버튼 텍스트와, 로그인상태값 업데이트)
  const loginCheckFunc=(login)=>{ 
    if(login.state==="login"){
      setAuthenticate(true);
      setBtnText('로그아웃');
      if(login.path){
        navigate(login.path);
      }
    }else if(login.state==="logout"){
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
  const saveProduct = (item, name) => {
    // 다차배열을 사용해서 item이 아닌 list에 고유의 key값을 넣어준다.
    //[ [{item}, key], [{item}, key], [{item}, key], [{item}, key] ]
    setSavePdt(function(){
      let save = savePdt ? [...savePdt, [item.item]] : [[item.item]];
      save[save.length-1].key = Math.random()*1000;
      if (item.number){
        save[save.length - 1].number = item.number;
        save[save.length - 1].price = item.number * item.item.price;
      }
      if (item.selectSize){
        save[save.length - 1].size = item.selectSize;
      }
      if(name==="추가"){
        popupFunc(name);
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
    });
  }
  
  // 팝업 상태 업데이트함수
  const popupFunc=(popup)=>{
    setMessageTxt(popup.description);
    setPopupState(popup.state);
  } 
  
  // 상품 받아오기 : 페이지 처음 렌더링시 한번만 실행
  useEffect(() => {
    getProducts();
  }, []);
  
  // 검색 : 모든 상품은 productList로부터 관리어야 한다. 
  // 상품데이터를 나눠서 관리하면 검색마다 나오는 상품들이 같은 상품인데 고유의 상품인 것처럼 별도로 관리되어버리기 때문에... 좋아요버튼이나, 상품 추가부분에서 이슈가 생긴다. 
  const searchFunc=(ob)=>{
    let list=[];
    if (ob.pathTxt ==="/top"){
      if(ob.keywordTxt===null){
        productList.map((item,index)=>{
          if(item.type==="top"){
            list.push(item);
          }
          if(index===productList.length-1){
            if(list.length===0){
              setSearchList("검색결과가 없습니다.");
            }else{
              setSearchList([...list]);
            }
          }
        });
      }else if(ob.keywordTxt!==null){
        productList.map((item,index)=>{
          if(item.type==="top" && item.title.indexOf(ob.keywordTxt)!==-1){
            list.push(item);
          }
          if(index===productList.length-1){
            if(list.length===0){
              setSearchList("검색결과가 없습니다.");
            }else{
              setSearchList([...list]);
            }
          }
        });
      }
    }else if (ob.pathTxt ==="/pants"){
      if(ob.keywordTxt===null){
        productList.map((item,index)=>{
          if(item.type==="pants"){
            list.push(item);
          }
          if(index===productList.length-1){
            if(list.length===0){
              setSearchList("검색결과가 없습니다.");
            }else{
              setSearchList([...list]);
            }
          }
        });
      }else if(ob.keywordTxt!==null){
        productList.map((item,index)=>{
          if(item.type==="pants" && item.title.indexOf(ob.keywordTxt)!==-1){
            list.push(item);
          }
          if(index===productList.length-1){
            if(list.length===0){
              setSearchList("검색결과가 없습니다.");
            }else{
              setSearchList([...list]);
            }
          }
        });
      }
    }else if(ob.pathTxt==="/"){
      if(ob.keywordTxt===null){
        setSearchList([...productList]);
      }else if(ob.keywordTxt!==null){
        productList.map((item,index)=>{
          if(item.title.indexOf(ob.keywordTxt)!==-1){
            list.push(item);
          }
          if(index===productList.length-1){
            if(list.length===0){
              setSearchList("검색결과가 없습니다.");
            }else{
              setSearchList([...list]);
            }
          }
        });
      }
    }else if(ob.pathTxt!=="/"&&ob.pathTxt!=="/pants"&&ob.pathTxt!=="/top"){
      setSearchList([]);
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
    } else if ( 
      paths.pathname === "/" || 
      paths.pathname === "/pants"|| 
      paths.pathname === "/top"
    ) {
      setClassName("page-product");
      // 상품 재랜더링
      searchFunc({keywordTxt:null, pathTxt:paths.pathname});
    }else if(paths.pathname === "/info"){
      setClassName("page-myinfo");
    } else {
      setClassName("page-detail");
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
              productList={searchList.length!==0?searchList : productList}
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
              productList={searchList.length!==0?searchList : productList}
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
              productList={searchList.length!==0?searchList : productList}
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
              updateLikeData={updateLikeData}
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
              path="qna"
            /> 
          }
        />
      </Routes> 
    </div>
  );
}

export default App;

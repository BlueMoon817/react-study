import React from "react";
import ProductDetail from './productDetail';
import { Navigate } from 'react-router-dom';
import MyListPage from './mylistPage';

export default function PrivatePage({authenticate, popupFunc, popupState, messageTxt, saveProduct, productList, path}){
  console.log(productList)
  return(
    <>
    {
      authenticate && path==="info"? 
      <MyListPage 
        authenticate={authenticate} 
        popupState={popupState} 
        messageTxt={messageTxt} 
        popupFunc={popupFunc}
        productList={productList}
        saveProduct={saveProduct}
      />:
      
      (authenticate && path!=="info"?
      <ProductDetail
        productList={productList} 
        saveProduct={saveProduct} 
        popupFunc={popupFunc} 
        popupState={popupState} 
        messageTxt={messageTxt} 
      /> 
      : <Navigate to="/login"/>)
    }
    </>
  );
}
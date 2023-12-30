import React from "react";
import ProductDetail from './productDetail';
import { Navigate } from 'react-router-dom';

export default function PrivatePage({authenticate, popupFunc, popupState, messageTxt, saveProduct, productList}){

  return(
    <>
    {
      authenticate? 
      <ProductDetail
        productList={productList} 
        saveProduct={saveProduct} 
        popupFunc={popupFunc} 
        popupState={popupState} 
        messageTxt={messageTxt} 
      /> 
      : <Navigate to="/login"/>
    }
    </>
  );
}
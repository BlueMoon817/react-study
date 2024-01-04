import React from "react";
import { Button } from './Button';
import { Text } from './Text';
import { useNavigate } from 'react-router-dom';
import {ModalContentBasic} from './ModalContentBasic'
import {ModalContentField} from './ModalContentField'
export const Modal = ({ type, popupFunc, popupInfo, addressData }) => {
  const navigate=useNavigate();
  return (
    <div className={`popup_wrap`}>
      <div className='popup_dim'></div>
      {
        type.cate==="basic"?
        <ModalContentBasic type={type} popupFunc={popupFunc} popupInfo={popupInfo}/>
          :(type.cate==="field"?
            <ModalContentField type={type} popupFunc={popupFunc} popupInfo={popupInfo} addressData={addressData}/> :""
          )
      
        }

      </div>
    )
  }

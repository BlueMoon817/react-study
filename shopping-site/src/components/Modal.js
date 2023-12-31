import React from "react";
import { Button } from './Button';
import { Text } from './Text';
export const Modal = ({messageTxt, popupFunc}) => {

  return (
    <div className={`popup_wrap`}>
      <div className='popup_dim'></div>
      <div className='popup_content'>
        <Text sort="p" description={messageTxt}/>
        <div className='btn_group btn_half'>
          <Button 
            btnType="button" 
            style='btn btn_close'
            name="계속 쇼핑하기" 
            onFunc={popupFunc}
          />
          <Button 
            btnType="button" 
            style='btn btn_close'
            name="장바구니로" 
            onFunc={popupFunc} 
            movePage="/list"
          />
        </div>
      </div>
    </div>
  )
}

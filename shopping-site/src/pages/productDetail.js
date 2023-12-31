import React, { useState } from "react";
import { useParams} from "react-router-dom";
import { Button } from "../components/Button";
import { Modal } from '../components/Modal';
import { Text } from '../components/Text';
import { Icon } from '../components/icon';

export default function ProductDetail({productList, saveProduct, popupState,messageTxt,popupFunc}) {
  const params = useParams();
  // 상품 사이즈선택
  const [selectSize, setSelectSize] = useState(null);
  const selectFunc=(name) => {
    setSelectSize(name);
  };
  const [number, setNumber]=useState(1);
  const numberFunc=(num)=>{
    setNumber(num);
  }
  return (
    <div className="wrap">
      {popupState===true? <Modal messageTxt={messageTxt} popupFunc={popupFunc}></Modal> : ""}
      <div className='content'>
        <div className='inner'>
        {
          productList.map((item)=>(
            item.id === parseInt(params.id) ? 
            <div className="detail_area">
              <div className="img_wrap">
                <img src={item.img} /> 
              </div>
              <div className="option_wrap">
                <div className="info_box">
                  <strong className="text_title">{item.title}</strong>
                  <span className="text_price">₩ {item.price}</span>
                </div>
                <div className="option_area">
                  <ul className="option_list">
                  {item.size?.map((type)=>(
                    <li className="list_item">
                      <Button 
                        style={`btn btn_option ${selectSize===null ?"":(selectSize===type?"is_active":"")}`} 
                        name={type} 
                        btnType="button" 
                        item={type} 
                        onFunc={selectFunc}
                        />
                      </li>
                    ))}
                  </ul>
                { selectSize==null?
                  <Text description="사이즈를 선택해주세요" sort="p"/>
                  :""
                }
                </div>
                <div className='count_area'>
                  <div className='count_box'>
                    <Text 
                      sort="span" 
                      description={number}
                    />
                    <div className='icon_box'>
                      <Icon 
                        iconName="plus" 
                        iconLabel="1개 추가버튼" 
                        onFunc={numberFunc} 
                        item={number}
                      />
                      <Icon 
                        iconName="minus" 
                        iconLabel="1개 삭제 버튼" 
                        onFunc={numberFunc} 
                        item={number}
                      />
                    </div>
                  </div>
                </div>
                <Text sort="p" description="수량을 선택해주세요." />
                <Button 
                  name="추가"
                  itemInfo={{number, selectSize}}
                  style={`btn btn_add`} 
                  btnType="button" 
                  onFunc={saveProduct} 
                  item={item}
                  key={Math.random()*1000} 
                  disabled={selectSize?false:"disabled"} 
                  popupFunc={popupFunc}
                />
                <Button 
                  itemInfo={{number, selectSize}}
                  name="바로구매하기"
                  style={`btn`} 
                  btnType="button"
                />                    
              </div>
            </div>  
            : ""
          ))}
        </div>
      </div>
    </div>
  );
}
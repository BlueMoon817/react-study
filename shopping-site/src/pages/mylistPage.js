import React from "react";
import { Text } from '../components/Text';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export default function MyListPage({productList}) {

  return (
    <div className='wrap'>
      <div className='content'>
        <h1>내 정보</h1>
        <div className='inner'>
            {
              productList.length === 0 ? 
              <>
                <Text textType="guide" description={`관심상품이 없습니다.`} sort="p"/>
                <Text textType="guide" description={`상품목록에서 찜하기를 눌러주세요`} sort="p"/>
              </>
              : <ul className='list_pdt'>
                {
                  productList.map((item)=>(
                    <li className="list_item">
                      <Link to={`/product/${item.id}`}>
                        <div className="img_wrap thumb_img">
                          <img src={item.img} />
                        </div>
                      <div className="text_wrap">
                        <Text 
                          textType="title" 
                          description={item.title} 
                          sort="p"
                        />
                        <Text 
                          textType="price" 
                          description={item.price} 
                          sort="strong"
                        />
                      </div>
                      </Link>
                      <Button 
                        btnType="button"
                        style="btn_icon btn_delete"
                        item={item}
                      />
                    </li>
                ))}
              </ul>
            }       
        </div>
      </div>
    </div>
  );
}
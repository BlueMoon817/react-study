import React from "react";
import { Link } from "react-router-dom";
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Img } from '../components/img';
export default function List({ list, productList, deleteFunc}) {
  return (
    <div className="wrap">
      <div className='content'>
        <h1>내 장바구니</h1>
        <div className='inner'>
            {
              // 장바구니 리스트가 null이면 안내텍스트 띄우기
              list === null ? 
              <>
                <Text textType="guide" description={`장바구니에 담긴 상품이 없습니다.`} sort="p"/>
                <Text textType="guide" description={`상품상세 페이지에서 상품을 추가해주세요.`} sort="p"/>
              </>
              :<ul className='list_pdt'>{
                // 장바구니 리스트에 목록이 있으면 해당 아이템 목록 렌더링
                productList.map((item)=>(
                  list.map((listItem)=>(
                    item.id === listItem[0].id ? 
                      <li className="list_item" key={item.id}>
                        <Link to={`/product/${item.id}`}>
                          <Img
                            imgName="thumb_img"
                            path={item.img}
                            description={item.title}
                          />
                          <div className="text_wrap">
                            <Text textType="title" description={item.title} sort="p"/>
                            <div className='text_area'>
                              <Text textType="price" description={listItem.number>1?`${listItem.price}`:`${item.price}`} sort="strong"/>
                              {
                                listItem.number>1?
                                <Text textType="price" description={`( ${listItem.number}개 * ${item.price} )`} sort="strong"/>:""
                              }
                              <Text textType="price" description={`사이즈 : ${listItem.size}`} sort="strong"/>
                            </div>
                          </div>
                        </Link>
                        {/* 상품지우기 버튼 */}
                        <Button 
                          btnType="button"
                          style="btn_icon btn_delete"
                          onFunc={deleteFunc}
                          item={listItem}
                        />
                      </li>
                    : ""
                  ))
                ))}
              </ul>
            }       
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

export default function List({ list, productList }) {
  return (
    <div className="wrap">
      <div className='content'>
        <h1>내 장바구니</h1>
        <div className='inner'>
          <ul className="list_pdt">
            {
              list.length === 0 ? <li className="text_guide"><p>장바구니에 담긴 상품이 없습니다. <br/> 상품상세 페이지에서 상품을 추가해주세요.</p></li> :
              productList.map((item)=>(
                list.map((listItem)=>(
                  item.id === listItem ? <li className="list_item">
                    <Link to={`/product/${item.id}`}>
                    <div className="img_wrap thumb_img">
                      <img src={item.img} />
                    </div>
                    <div className="text_wrap">
                      <p className="text_title">{item.title}</p>
                      <strong className="text_price">{item.price}</strong>
                    </div>
                    </Link></li> : ""
                ))
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
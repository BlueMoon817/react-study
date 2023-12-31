import React from "react";
import { ProductCard } from "../components/ProductCard";
import { Text } from '../components/Text';
import { Icon } from '../components/icon';

export default function Main({ productList, saveProduct, updateLikeData,authenticate }){

  return(
    <div className="wrap">
      <div className='content'>
        <div className='inner'>
          <div className="product_area">
            <ul className="product_list">
              {
              typeof productList === "string"?
              <Text sort="p" description={productList}/>
              :
              productList.map((menu) => (
                <li className="list_item">
                  <ProductCard 
                    item={menu} 
                    saveProduct={saveProduct}
                  />
                  <Icon 
                    iconName={menu.name?menu.name:"heart"}
                    iconLabel={menu.like?"관심상품 취소하기":"관심상품으로 등록하기"}
                    onFunc={updateLikeData}
                    item={menu}
                    authenticate={authenticate}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
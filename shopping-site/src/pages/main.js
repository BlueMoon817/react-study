import React from "react";
import { ProductCard } from "../components/ProductCard";
import { Text } from '../components/Text';
import { Icon } from '../components/icon';
import { useNavigate } from "react-router-dom";
export default function Main({ productList, saveProduct, updateLikeData,authenticate }){
  const navigate=useNavigate()
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
                <li className="list_item" key={menu.id}>
                  <ProductCard 
                    item={menu} 
                    saveProduct={saveProduct}
                  />
                  <Icon 
                    iconName={menu.name?menu.name:"heart"}
                    iconLabel={menu.like?"관심상품 취소하기":"관심상품으로 등록하기"}
                    onClick={()=>{
                      if (authenticate){
                        updateLikeData((menu)=>{
                          if ( menu.name==="heart"){
                            menu.state="fill"
                            menu.name="heart_filled"
                            return menu;
                          }else if(menu.name==="heart_filled"){
                            menu.state="empty"
                            menu.name="heart"
                            return menu;
                          }
                        });
                      }else {
                        navigate('/login');
                      }
                    }}
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
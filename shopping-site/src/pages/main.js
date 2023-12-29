import React from "react";
import { ProductCard } from "../components/ProductCard";

export default function Main({ productList, saveProduct }){

  return(
    <div className="wrap">
      <div className='content'>
        <div className='inner'>
          <div className="product_area">
            <ul className="product_list">
              {productList.map((menu) => (
                <li className="list_item"><ProductCard item={menu} saveProduct={saveProduct} /></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
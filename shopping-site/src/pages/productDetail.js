import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Button } from "../components/Button";

export default function ProductDetail({productList, saveProduct}) {
  const params = useParams();

  return (
    <div className="wrap">
      <div className='content'>
        <div className='inner'>
              {productList.map((item)=>(
                item.id === parseInt(params.id) ? 
                <>
                <div className="detail_area">
                  <div className="img_wrap">
                    <img src={item.img}></img> 
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
                            <Button style="btn btn_option" name={type} btnType="button" startFunc={false}></Button></li>
                        ))}
                      </ul>
                    </div>
                    <Button name="추가" style={`btn btn_add`} btnType="button" startFunc={saveProduct} item={item.id} />                    
                    <Button name="바로구매하기" style={`btn`} btnType="button"/>                    
                  </div>
                  </div>  
                </>
                : ""
              ))}
        </div>
      </div>
    </div>
  );
}
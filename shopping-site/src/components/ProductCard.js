import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({item}) => {

  return (
      <Link className="pdt_box" to={`/product/${item.id}`}>
        <div className="img_wrap">
          <img src={item.img}></img>
          {item.new ? <span className="ic_badge">new</span> : ""}
        </div>
        <div className="text_wrap">
          <span className="text_title">{item.title}</span>
          <span className="text_price">₩ {item.price}</span>
        </div>
    </Link>
  )
}

import React from "react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
const ProductDetailPage = () => {
  const {id} = useParams();
  return (
    <div>
      <h1>ProductDetailPag{id}</h1>
      <Link to="/about">Go To About Page</Link>
      <Link to="/products">Go To Products Page</Link>
    </div>
  )
}

export default ProductDetailPage;
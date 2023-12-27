import React from "react";
import { useSearchParams } from "react-router-dom";

const Productpage = () => {
  let [query, setQuery] = useSearchParams();
  console.log(query.get('q')); // q="읽어오는 값"
  return (
    <div>
      <h1>Show All Product~~</h1>
      
    </div>
  )
}

export default Productpage;
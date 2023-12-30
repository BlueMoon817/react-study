import React from "react";
export const Text = ({sort, textType, description}) => {
  
  
  if(sort === "p"){
    return (<p className={`text_desc ${textType?`text_${textType}`:""}`}>{`${description}`}</p>);
  }else if(sort === "strong"){
    return (<strong className={`text_desc ${textType?`text_${textType}`:""}`}>{`${description}`}</strong>)
  }else if(sort === "span"){
    return (<span className={`text_desc ${textType?`text_${textType}`:""}`}>{`${description}`}</span>)
  }
}

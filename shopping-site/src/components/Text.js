import React from "react";
export const Text = ({textType, description}) => {
  return (
    <p className={`text_desc text_${textType}`}>{description}</p>
  )
}

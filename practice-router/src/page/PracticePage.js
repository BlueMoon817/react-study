import React from "react";

export default function Practice (){

  return (
    <>
      <div className="tab js-tab">
        <ul className="tab-list tab-list-large" role="tablist">
          <li className="tab-item js-tab-item">
            <button type="button" className="tab-btn js-tab-btn" role="tab" aria-selected="false" aria-controls="tab04">tab 04</button>
          </li>
          <li className="tab-item js-tab-item">
            <button type="button" className="tab-btn js-tab-btn" role="tab" aria-selected="false" aria-controls="tab05">tab 05</button>
          </li>
          <li className="tab-item js-tab-item is-selected">
            <button type="button" className="tab-btn js-tab-btn" role="tab" aria-selected="true" aria-controls="tab06">tab 06</button>
          </li>
        </ul>
        <div className="js-tab-panel" role="tabpanel" id="tab04">
          tab contents 04
        </div>
        <div className="js-tab-panel" role="tabpanel" id="tab05">
          tab contents 05
        </div>
        <div className="js-tab-panel" role="tabpanel" id="tab06">
          tab contents 06
        </div>
      </div>
    </>
  )
}

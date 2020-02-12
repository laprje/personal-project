import React from "react";
import "./MiniSection.css";

export default function MiniSection(props) {
  let i = 0;
  let dataArray = props.info.filter((element, index) => {
    return index % 2 === 0;
  })
  let dataFieldArr = props.info.filter((element, index) => {
    return index % 2 ==! 0;
  })
  return (
    <div className="mini">
      <div className="mini-header">
        <h5>{props.text}</h5>
      </div>
      <div className="mini-section">
      <ul className="fields">
        {dataFieldArr.map(el => { if(el) return(
              <li key={i++}><h4>{el}</h4></li>
          )})}
        </ul>
        <ul className="data">
          {/* {props.info.map(el => (
            <li key={i++}><h4>{el}</h4></li>
          ))} */}
          {dataArray.map(el => { if(el) return(
              <li key={i++}><h4>{el}</h4></li>
          )})}
          {/* `{dataArray.map(el => { if(el) return(
              <li key={i++}><h4>{el}</h4></li>
          ) else (<li key={i++}><h4>{el}</h4></li>)})}` */}
        </ul>
        
      </div>
    </div>
  );
}

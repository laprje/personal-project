import React, { Component } from "react";
import axios from "axios";
import "./ReleaseCard.css";

export default function ReleaseCard(props) {
  return (
    <div className="release-card">
      <div className="card-info">
        <div className="img-container">
          <img
            className="car-image"
            src={props.img ? props.img : "assets/img-not-found.png"}
            alt="car image"
          />
        </div>
        <div className="right-box">
            <h2>{props.year?props.year:'2069'} {props.make?props.make:'vOlVo'} {props.model?props.model:'V60'}</h2>
            <div className="info">
                <h6>Release Date: {props.releaseDate?props.releaseDate:'N/A'}</h6>
                <h6>Price: {props.price?"$"+props.price:'N/A'}</h6>
                <h6>Engine Type: {props.engineType?props.engineType:"N/A"}</h6>
                
            </div>
        </div>
        <button className="expand"><i className="fas fa-chevron-right"></i></button>
      </div>
    </div>
  );
}

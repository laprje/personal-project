import React, { Component } from "react";
import Header from "../Header/Header";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="all">
        <Header className="home-header"/>
        <div className="big-h1">
          <h1>Find the value of any car, any time.</h1>
        </div>
        <div className="home">
          <div className="buttons">
            <Link to="/wizard1">
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

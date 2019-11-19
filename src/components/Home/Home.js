import React, { Component } from "react";
import Header from "../Header/Header";
import "./Home.css";
import {Link} from 'react-router-dom'
import { connect } from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="module">
          <div className="module-inside">
            <Link to='/wizard1'><button>Get Started</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

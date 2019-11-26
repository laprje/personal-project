import React, { Component } from "react";
import Header from "../Header/Header";
import "./Home.css";
import { Link } from "react-router-dom";
import { updateLoggedIn } from '../../ducks/reducer'
import { connect } from 'react-redux'

class Home extends Component {
 constructor(props) {
  super(props)
  this.state = {
    loggedIn: props.loggedIn
  }
 }
 
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
              <button className="get-started">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps, { updateLoggedIn })(Home);

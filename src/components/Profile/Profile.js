import React, { Component } from "react";
import Header from "../Header/Header";
import axios from 'axios'

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount(req, res) {
    axios.get("/api/auth/me").then(user => {
      this.setState({
        user: user.data
      });
    });
  }

  render() {
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">
          <div className="left-box">
            <i class="fas fa-user"></i>
          </div>
          <div className="right-box">
            <div className="email">{this.state.user.email && <h4>{this.state.user.email}</h4>}</div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
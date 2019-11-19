import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { updateUserInfo } from "../../ducks/reducer";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(req, res) {
    axios.get("/api/auth/me").then(user => {
      this.setState({
        user: user.data
      });
    });
  }

  logout = () => {
    axios.post("/auth/logout").then(res => {
        Swal.fire({
            title: "Come again soon!",
            icon: "success"
          });
      this.props.updateUserInfo({
        email: "",
        name: "",
        user_id: "",
        profile_img: ""
      });
    });
  };
  render() {
    return (
      <div className="Header">
        <div className="header-container">
          <div className="logo-container">
            <h2>AutoValue</h2>
          </div>
          <div className="button-container">
            <Link to="/home">
              <button className="icon">
                <i class="fas fa-home"></i>
              </button>
            </Link>
            <Link to="/profile">
              <div className="profile-link">
                <button className="icon">
                  <i class="fas fa-user"></i>
                </button>
                <div className="email">
                  {this.state.user.email && <h4>{this.state.user.email}</h4>}
                </div>
              </div>
            </Link>
            <Link to="/">
              <button className="logout-btn" onClick={this.logout}>
                Log out
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email
  };
}

export default connect(mapStateToProps, { updateUserInfo })(Header);

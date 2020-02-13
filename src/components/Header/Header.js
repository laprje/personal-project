import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { updateUserInfo, updateUser } from "../../ducks/reducer";
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

  logout = () => {
    axios.post("/auth/logout").then(res => {
      // this.props.history.push("/");
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
            <i className="fas fa-check-double"></i>
          </div>

          <div className="button-container">
            <Link className="username" to="/profile">
              <div className="profile-link">
                <h3>Hello, {this.props.email}</h3>
                <button className="icon">
                  <i className="fas fa-user"></i>
                </button>
              </div>
            </Link>
            <Link to="/release">
              <button className="icon">
                <i className="fas fa-exclamation-circle"></i>
              </button>
            </Link>
            <Link to="/vehicle">
              <button className="icon">
                <i className="fas fa-car"></i>
              </button>
            </Link>
            <Link to="/home">
              <button className="icon">
                <i className="fas fa-home"></i>
              </button>
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

function mapStateToProps(reduxState) {
  const { user, email, user_id } = reduxState;
  return {
    user,
    email,
    user_id
  };
}

export default connect(mapStateToProps, { updateUserInfo, updateUser })(Header);

import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import "./Profile.css";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import Swal from "sweetalert2";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: props.email,
      editToggle: false
    };
    this.baseState = this.state;
    this.clearForm = this.clearForm.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  componentDidMount(req, res) {
    axios.get("/api/auth/me").then(user => {
      this.setState({
        user: user.data,
        email: user.data.email
      });
    });
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  saveChanges() {
    axios
      .put(`/api/user/${this.props.user_id}`, this.state)
      .then(res => {
        this.setState({
          user: res.data
        });
        this.props.updateUserInfo({ email: this.state.email });
        Swal.fire({
          title: "Email Address Changed!",
          icon: "success"
        });
      })
      .catch(err => {
        console.log(err);
        if (!this.state.email) {
          Swal.fire({
            title:
              "There was an error trying to change your email address. Please try again.",
            icon: "warning"
          });
        }
      });
  }

  toggleEdit() {
    this.setState({
      editToggle: !this.state.editToggle
    });
    if (this.state.editToggle && this.state.email) {
      this.saveChanges();
    }
  }

  clearForm() {
    const form = document.getElementById("form");
    form.reset();
    this.setState(this.baseState);
  }

  logout = () => {
    axios.post("/auth/logout").then(res => {
      this.props.updateUserInfo({
        email: "",
        name: "",
        user_id: "",
        profile_img: ""
      });
      this.props.history.push('/')
    });
  };

  deleteAccount() {
    axios
      .delete(`/api/user/${this.props.user_id}`)
      .then(() => {
        this.logout();
        Swal.fire({
          title: 'Account Deleted',
          icon: 'success',
          text: "We're sad to see you go!"
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <Header />
        <div className="profile">
          <h2>Your Account</h2>
          <div className="profile-box">
            <div className="left-box">
              <i className="profile-icon" class="fas fa-user"></i>
            </div>
            <div className="right-box">
              <div className="email">
                {this.state.email && <h4>Email Address: {this.state.email}</h4>}
              </div>
              {this.state.editToggle ? (
                <div className="edit-input">
                  <br />
                  <form id="form">
                    <input
                      placeholder={this.state.email}
                      onChange={e => this.handleChange("email", e.target.value)}
                    />
                  </form>
                  {/* <button className="cancel-btn" onClick={this.clearForm()}>
                    Cancel
                  </button> */}
                  {/* <button className="save-btn" onClick={this.saveChanges()}>Save Changes</button> */}
                </div>
              ) : null}
              <button
                className="edit-btn"
                onClick={() => {
                  this.toggleEdit();
                }}
              >
                Change Email
              </button>
            </div>
          </div>
          <button className="delete-btn" onClick={this.deleteAccount}> Delete Account </button>
        </div>
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Profile);

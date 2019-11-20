import React, { Component } from "react";
import Header from "../Header/Header";
import axios from 'axios'
import './Profile.css'
import { connect } from 'react-redux'
import {updateUserInfo} from '../../ducks/reducer'

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      editToggle: false
    };
    // this.saveChanges = this.saveChanges.bind(this)
    // this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentDidMount(req, res) {
    axios.get("/api/auth/me").then(user => {
      this.setState({
        user: user.data
      });
    });
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  saveChanges() {
    axios
        .put(`/api/user/${this.state.user.user_id}`, this.state)
        .then( res => {
          this.setState({
          user: res.data
        })
          console.log(this.state.user)
      })
        .catch(err => console.log(err))
}

  toggleEdit() {
    console.log('hit')
    this.setState({
      editToggle: !this.state.editToggle
    })
    if(this.state.editToggle && this.state.email) {
      this.saveChanges()
    }
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
            <div  className="email">{this.state.user.email && <h4>Email Address: {this.state.user.email}</h4>}</div>
            {this.state.editToggle ?
                    <div className="edit-input">
                        <br />
                        <input placeholder={this.state.user.email} onChange={e => this.handleChange("email", e.target.value)} />
                        {/* <button className="save-btn" onClick={this.saveChanges()}>Save Changes</button> */}
                    </div>
                    : null}
            <button className='edit-btn' onClick={() => {this.toggleEdit(); console.log(this.state.editToggle)}}>Change Email</button>
          </div>
        </div>
      </div>
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Profile);
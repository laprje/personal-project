import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import "./Login.css";

import {TextField} from "@material-ui/core";
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import {lightBlue} from '@material-ui/core/colors'
import {blueGrey} from '@material-ui/core/colors'



const blue=lightBlue[300]
const white=blueGrey[700]


const CssTextField = withStyles(theme => ({
  root: {
    '& label.Mui-focused': {
      color: white,
    },
    '& .MuiInput-underline': {
      borderBottomColor: white,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: white,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: white,
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: blue,
      },
    },
  },
}))(TextField);

const style = {
  color: white,
  background: 'transparent'
}

class Login extends Component {
  state = {
    email: "",
    password: "",
    toggleRegister: false,
    blurClass: "blurNo"
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };


  login = () => {
    const { email, password } = this.state;
    axios
      .post("/auth/login", { email, password })
      .then(res => {
        Swal.fire({
          title: "Welcome back!",
          icon: "success"
        });
        this.props.updateUserInfo(res.data.user);
        this.props.history.push("/home");
      })
      .catch(err => {
        Swal.fire({
          title: `Oops! Please try again.`,
          icon: "warning"
        });
      });
  };

 

  toggleClassName = () => {
    if (this.state.blurClass === "blurNo") {
      this.setState({
        blurClass: "blurYes"
      });
    } else {
      this.setState({
        blurClass: "blurNo"
      });
    }
  };

 

  render() {
    return (
      <div className={this.state.blurClass}>
        <div className="login-all">
          <div className="background"></div>
          <div className="big-logo">
            <h1>
              AutoValue<i className="fas fa-check-double"></i>
            </h1>
            
          </div>
          
          <div className="login">
          {/* <h5>To test existing user: email: user  password: user. <br></br> To test stripe register function, type username and password and hit register.</h5> */}
            <div className="inputs">
              {//material ui core component
              }
            <CssTextField
                className="textfield"
                style={style}
                label="Email / Username"
                id="custom-css-outlined-input"
                formcontrolprops={{
                    fullWidth: true
                }}
                type="text"
                value={this.state.email}
                onChange={e => this.handleChange("email", e.target.value)}
            />
            <CssTextField
            className="textfield"
            label="Password"
            id="custom-css-outlined-input"
            formcontrolprops={{
                fullWidth: true
            }}
            type="password"
            value={this.state.password}
            onChange={e => this.handleChange("password", e.target.value)}
            />
              {/* {/* <input
                type="text"
                value={this.state.email}
                placeholder="Email"
                onChange={e => this.handleChange("email", e.target.value)}
              /> */}
            </div>
            <div className="buttons">
              <Button className="login-btn" onClick={this.login}>Log In</Button>
              <h4>OR Create an Account Here: </h4>
              <Button onClick={() => this.props.history.push('/register')}>Register</Button>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Login);

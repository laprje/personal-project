import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import axios from "axios";
import Swal from "sweetalert2";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import { blueGrey } from "@material-ui/core/colors";
import "./Register.css";

import { StripeProvider, Elements } from "react-stripe-elements";
import StripeForm from "./StripeForm";

const blue = lightBlue[300];
const white = blueGrey[700];

const CssTextField = withStyles(theme => ({
  root: {
    "& label.Mui-focused": {
      color: white
    },
    "& .MuiInput-underline": {
      borderBottomColor: white
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: white
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: white
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: blue
      }
    }
  }
}))(TextField);

const style = {
  color: white,
  background: "transparent"
};

class Register extends Component {
  state = {
    email: "",
    password1: "",
    password2: '',
    toggleRegister: false
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  register = () => {
    const { email, password2 } = this.state;
    axios
      .post("/auth/register", { email, password2 })
      .then(res => {
        Swal.fire({
          title: "Welcome to AutoValue!",
          icon: "success"
        });
        // axios.post("");
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

  toggleRegister = () => {
    const {password1, password2} = this.state
    if(password1 === password2) {
        this.setState({ toggleRegister: !this.state.toggleRegister });
    } else {
        Swal.fire({
            title: "Passwords Do Not Match.",
            icon: "error"
        })
    }
  };

  registerButton = () => {
    //try to get it so that when a user tries to register an email that already has an account
    //that it will stop the process before getting to stripe.

    this.toggleRegister();

    // const {email} = this.state
    // console.log('hit', email)
    // axios.get("/api/user/:email", {email}).then(res => {
    //   console.log(res)
    // if(res) {
    //   Swal.fire({
    //     title: `A user with that email already exists!`,
    //     icon: "error"
    //   });
    // } else {
    //   this.toggleRegister();
    //   this.toggleClassName();
    // }
    // });
  };

  render() {
    return (
      <div className="all">
        <div className="big-logo">
          <h1>
            AutoValue<i className="fas fa-check-double"></i>
          </h1>
        </div>
        {/* <div className="background"></div> */}
        <div className="register">
          <div className="inputs">
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
              value={this.state.password1}
              onChange={e => this.handleChange("password1", e.target.value)}
            />
            <CssTextField
              className="textfield"
              label="Re-enter Password"
              id="custom-css-outlined-input"
              formcontrolprops={{
                fullWidth: true
              }}
              type="password"
              value={this.state.password2}
              onChange={e => this.handleChange("password2", e.target.value)}
            />
            <br></br>
              <Button onClick={() => this.registerButton()}>
                Register
              </Button>
              <h5>If you have an account, log in here: </h5>
              <Button onClick={() => this.props.history.push('/')}>Login</Button>
           
             
            
          </div>
          {this.state.toggleRegister ? (
            <div className="stripe">
              <StripeProvider apiKey="pk_test_bPnytOMZMGmHmoSiQPtIQu9J00YjPot9LC">
                <Elements>
                  <StripeForm
                    register={this.register}
                    registerButton={this.registerButton}
                  />
                </Elements>
              </StripeProvider>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Register);

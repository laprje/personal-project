import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import "./Login.css";
import { StripeProvider, Elements } from "react-stripe-elements";
import StripeForm from "./StripeForm";

import {TextField} from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import {Button} from '@material-ui/core'
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import {lightBlue} from '@material-ui/core/colors'
import {grey} from '@material-ui/core/colors'

// const styles = theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     backgroundColor: "#333" // for illustrative purposes
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2
//   },
//   inputRoot: {
//     color: theme.palette.primary.contrastText
//   },
//   underline: {
//     borderBottom: "2px solid white",
//     "&:after": {
//       // The source seems to use this but it doesn't work
//       borderBottom: "2px solid white"
//     }
//   }
// });

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#e1f5fe',
    border: '1px solid #e1f5fe',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor:'#e1f5fe',
    },
  },
}))(InputBase);


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#30bced'
    },
    secondary: {
      main: '#e1f5fe',
    },
  },
});

const blue=lightBlue[300]
const white=grey[50]


const CssTextField = withStyles(theme => ({
  root: {
    '& label.Mui-focused': {
      color: blue,
    },
    '& .MuiInput-underline': {
      borderBottomColor: white,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: blue,
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

  register = () => {
    const { email, password } = this.state;
    axios
      .post("/auth/register", { email, password })
      .then(res => {
        Swal.fire({
          title: "Welcome to AutoValue!",
          icon: "success"
        });
        axios 
          .post('')
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

  toggleRegister = () => {
    this.setState({ toggleRegister: !this.state.toggleRegister });
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

  registerButton = () => {
    //try to get it so that when a user tries to register an email that already has an account
    //that it will stop the process before getting to stripe.
   
      this.toggleRegister();
      this.toggleClassName();
    
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
      <div className={this.state.blurClass}>
        <div className="login-all">
          <div className="background"></div>
          <div className="big-logo">
            <h1>
              AutoValue<i className="fas fa-check-double"></i>
            </h1>
            
          </div>
          
          <div className="login">
          <h5>To test existing user: email: user  password: user. <br></br> To test stripe register function, type username and password and hit register.</h5>
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
            type="text"
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
            <br></br>

            <div className="buttons">
              <Button onClick={this.registerButton}>Register</Button>
              <Button onClick={this.login}>Log In</Button>
            </div>
          </div>
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
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Login);

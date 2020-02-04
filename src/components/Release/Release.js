import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import "./Release.css";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import Swal from "sweetalert2";
import SavedVehicle from "../Vehicle/SavedVehicle";
import Loading from "../Loading/Loading";

export default class Release extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  /* use this to log out if user does not exist. Commented out for development */

  // componentWillMount() {
  //     if(!this.props.email && !this.props.user_id) {
  //       this.props.history.push('/')
  //     }
  //   }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
  }

  render() {
    return (
      <>
        {this.state.loading && (
          <>
            <Header></Header>
            <div className="loading">
              <Loading />
            </div>
          </>
        )}
        {!this.state.loading && (
          <>
          <Header></Header>
            <div className="release"></div>
          </>
        )}
      </>
    );
  }
}

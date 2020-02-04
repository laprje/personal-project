import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import "./Release.css";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { default as Card } from "../ReleaseCard/ReleaseCard";

export default class Release extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  /* use this for force log out if user does not exist. Commented out for development */

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
        <Header></Header>
        {this.state.loading && (
          <>
            <div className="loading">
              <Loading />
            </div>
          </>
        )}
        {/* RENDER AFTER LOADING ANIMATION */}
        {!this.state.loading && (
          <>
            <h1>
              Welcome to Releases!<br></br>(Beta)
            </h1>
            <div className="release">
              <div className="card-container">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

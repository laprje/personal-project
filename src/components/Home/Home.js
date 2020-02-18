import React, { Component } from "react";
import Header from "../Header/Header";
import "./Home.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading/Loading";
import Axios from "axios";
import {updateUser, updateUserInfo} from '../../ducks/reducer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      loading: true,
      user: {},
      email: '',
    };
  }


  async componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
    await Axios.get("/auth/getSession").then(res => {
      // console.log(res.data)
      this.setState({ user: res.data, email: res.data.email });
    });
    if (!this.state.user.email) {
      this.props.history.push("/");
    } else {
      // console.log(this.state.user);
      this.props.updateUserInfo({email: this.state.email})
      this.props.updateUser({user: this.state.user})
    }
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
        <div className="home-all">
          <Header className="home-header" />
          <div className="big-h1">
            <h1>Find the value of any car, any time.</h1>
          </div>
          <div className="home">
            <div className="button">
              <Link to="/wizard1">
                <button className="get-started">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  const {user, email, user_id} = reduxState;
  return {
    user, email, user_id
  };
}

export default connect(mapStateToProps, { updateUserInfo, updateUser })(Home);

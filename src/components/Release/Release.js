import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import "./Release.css";
import Loading from "../Loading/Loading";
import { default as Card } from "../ReleaseCard/ReleaseCard";
import { default as Expanded } from "../ExpandedCard/ExpandedCard";
import { connect } from "react-redux";
import { updateSelected } from "../../ducks/reducer";
import {updateUser, updateUserInfo} from '../../ducks/reducer';

class Release extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      releases: [],
      hidden: true,
      selected: {},
      user: {},
      email: ''
    };
  }


  getReleases() {
    axios.get("/api/releases").then(res => {
      this.setState({
        releases: res
      });
      // console.log(this.state.releases);
    });
  }
  
  shorten(str) {
    if(str && str.length > 45) {
      return str = str.substring(0,44) + "...";
  } else return str
  }

  async componentDidMount() {
    this.getReleases();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
    await axios.get("/auth/getSession").then(res => {
      // console.log(res.data)
      this.setState({ user: res.data, email: res.data.email });
    });
    if (!this.state.user.email) {
      this.props.history.push("/");
    } else {
      console.log(this.state.user);
      this.props.updateUserInfo({email: this.state.email})
      this.props.updateUser({user: this.state.user})
    }
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
              <div className="card-container" id="scroll-style">
                <div className="size-limit">
                  {this.state.releases.data.map(el => (
                    <Card
                      onClick={() => this.expandFunction()}
                      key={el + el.release_date + el.make + el.model}
                      releaseObj={el}
                      image={el.image}
                      make={el.make}
                      model={el.model}
                      release_date={el.release_date}
                      base_msrp={el.base_msrp}
                      drive_type={el.drive_type}
                      top_engine={this.shorten(el.top_engine)}
                      bottom_engine={this.shorten(el.bottom_engine)}
                      power={el.power}
                      torque={el.torque}
                      power_rpm={el.power_rpm}
                      torque_rpm={el.torque_rpm}
                      zero_to_sixty={el.zero_to_sixty}
                      top_speed={el.top_speed}
                      mpg_highway={el.mpg_highway}
                      mpg_city={el.mpg_city}
                      range={el.range}
                      weight={el.weight}
                      cargo_volume={el.cargo_volume}
                      charge_time={el.charge_time}
                      body_type={el.body_type}
                      door_count={el.door_count}
                      seating={el.seating}
                      sources={el.sources}
                    />
                  ))}
                </div>
              </div>

              {this.props.selected.make && this.props.selected.model ? (
                <div className="expanded-container" id="scroll-style-1">
                  <div className="limit">
                    <Expanded>{/*expanded card view*/}</Expanded>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  const { selected, user, email } = reduxState;
  return {
    selected, user, email
  };
}

export default connect(mapStateToProps, {
  updateSelected, updateUser, updateUserInfo
})(Release);

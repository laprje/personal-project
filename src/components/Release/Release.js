import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import "./Release.css";
import Loading from "../Loading/Loading";
import { default as Card } from "../ReleaseCard/ReleaseCard";
import { default as Expanded } from "../ExpandedCard/ExpandedCard";
import { connect } from "react-redux";
import { updateSelected } from "../../ducks/reducer";

class Release extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      releases: [],
      hidden: true,
      selected: {}
    };
  }

  /* use this for force log out if user does not exist. Commented out for development */

  // componentWillMount() {
  //     if(!this.props.email && !this.props.user_id) {
  //       this.props.history.push('/')
  //     }
  //   }

  getReleases() {
    axios.get("/api/releases").then(res => {
      this.setState({
        releases: res
      });
      console.log(this.state.releases);
    });
  }

  componentDidMount() {
    this.getReleases();
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
                <div className="card-container" id="scroll-style">
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
                      top_engine={el.top_engine}
                      bottom_engine={el.bottom_engine}
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
                {this.props.selected.make && this.props.selected.model ? (
                  <Expanded>{/*expanded card view*/}</Expanded>
                ) : null}
              </div>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  const { selected } = reduxState;
  return {
    selected
  };
}

export default connect(mapStateToProps, {
  updateSelected
})(Release);

import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSelected } from "../../ducks/reducer";
import axios from 'axios'

import "./ReleaseCard.css";

class ReleaseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
  
    };
  }

  shorten(str) {
    if(str && str.length > 46) {
      const newStr = str.substring(0, 45) + "..."
      return newStr
    }
  }

  

  withCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  async expandFunction() {
    const { make } = this.props;
    const { model } = this.props;
    axios.get(`/api/releases/release/${make}/${model}`).then(res => {
      this.setState({ selected: res.data[0] });
    //   console.log(this.state.carInfo);
      this.props.updateSelected(this.state.selected)
    //   console.log(this.props.selected)
    });
  }


  render() {
    return (
      <div className="release-card">
        <div className="card-info" onClick={() => this.expandFunction()}>
          <div className="img-container">
            <img
              className="car-image"
              src={
                this.props.image ? this.props.image : "assets/img-not-found.png"
              }
              alt={`${this.props.make + this.props.model}`}
            />
          </div>
          <div className="right-box">
            <h2>
              {this.props.make ? this.props.make : "N/A"}{" "}
              {this.props.model ? this.props.model : "N/A"}
            </h2>
            <div className="info">
              <h6>
                Release Date:{" "}
                {this.props.release_date ? this.props.release_date : "N/A"}
              </h6>
              <h6>
                MSRP:{" "}
                {this.props.base_msrp ? "$" + this.withCommas(this.props.base_msrp) : "N/A"}
              </h6>
              <h6>
                Engine:{" "}
                {this.props.top_engine
                  ? this.props.top_engine
                  : this.props.bottom_engine
                  ? this.props.bottom_engine
                  : "N/A"}
              </h6>
              {/* <h6> 0-60: {this.props.zero_to_sixty?this.props.zero_to_sixty + " seconds":'N/A'}</h6> */}
            </div>
          </div>
          <button className="expand" onClick={() => this.expandFunction()}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
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
})(ReleaseCard);

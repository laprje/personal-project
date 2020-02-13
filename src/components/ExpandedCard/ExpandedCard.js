import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSelected } from "../../ducks/reducer";
import MiniSection from './MiniSection'

import "./ExpandedCard.css";

class ExpandedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  withCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  render() {
    return (
      <div className="column">
        <div className="expanded-card">
          <div className="card-header" id="card-header">
            <div className="left-box">
              <h4>
                {this.props.selected.model_year
                  ? this.props.selected.model_year
                  : ""}{" "}
                {this.props.selected.make} {this.props.selected.model}
              </h4>
            </div>
            <div className="right-box">
              <button
                className="exit-btn"
                onClick={() => {
                  this.props.updateSelected({});
                  this.setState({ carInfo: {} });
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <img id="i" src={this.props.selected.image} />
            <h3>Expected MSRP: ${this.withCommas(this.props.selected.base_msrp)}</h3>
            <h5>Release Date: {this.props.selected.release_date?this.props.selected.release_date:null}</h5>
            <MiniSection text="Body and Chassis" info={[this.props.selected.body_type, "Body Type", this.props.selected.weight, "Weight (lbs)", this.props.selected.drive_type, "Drivetrain", this.props.selected.door_count, "Door Count", this.props.selected.seating, "Seating"]}/>
            <MiniSection text="Powertrain" info={[this.props.selected.top_engine, "Top Engine", this.props.selected.bottom_engine, "Bottom Engine", `${this.props.selected.power} Horsepower`, "Power Output", `@${this.props.selected.power_rpm}`, "Power RPM", `${this.props.selected.torque} lb/ft`, "Torque",  `@${this.props.selected.torque_rpm}`, "Torque RPM", this.props.selected.manual_option, "Manual Option"]}/>
            <MiniSection text="Performance" info={[this.props.selected.zero_to_sixty, "0-60 (Seconds)", this.props.selected.top_speed, "Top Speed (MPH)", this.props.selected.mpg_highway, "MPG Highway", this.props.selected.mpg_city, "MPG City", ]}/>
            <MiniSection text="Dimensions" info={[`${this.props.selected.length} in`, "Length", `${this.props.selected.width} in`, "Width", `${this.props.selected.height} in`, "Height", `${this.props.selected.wheelbase} in`, "Wheelbase", `${this.props.selected.cargo_volume} cu ft`, "Cargo Volume"]} />
          </div>
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
})(ExpandedCard);

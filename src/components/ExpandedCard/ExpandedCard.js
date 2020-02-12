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

  render() {
    return (
      <div className="column">
        <div className="expanded-card">
          <div className="card-header" id="card-header">
            <div className="left-box">
              <h4>
                {this.props.selected.release_date
                  ? this.props.selected.release_date
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
            <MiniSection text="Body and Chassis" info={[this.props.selected.body_type, this.props.selected.drive_type, this.props.selected.door_count, this.props.selected.seating]}/>
            <MiniSection text="Powertrain" info={[this.props.selected.top_engine, this.props.selected.bottom_engine, this.props.selected.power, this.props.selected.power_rpm, this.props.selected.torque, this.props.selected.torque_rpm]}/>
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

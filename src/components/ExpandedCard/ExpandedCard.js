import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSelected } from "../../ducks/reducer";
import FastAverageColor from "fast-average-color";

import "./ExpandedCard.css";

class ExpandedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  componentWillMount() {
    const fac = new FastAverageColor();
    // dominant color select
  }

  // updateInfo() {
  //   this.componentDidMount()
  //   this.props.updateSelected({selected: {make: this.state.selected.make, model: this.state.selected.model}})
  // }

  render() {
    return (
      <div className="column">
        <div className="expanded-card">
          <div className="card-header">
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
          <div className="card-body"></div>
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

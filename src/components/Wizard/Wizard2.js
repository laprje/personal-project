import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { updateModel } from "../../ducks/reducer";

class Wizard2 extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <div className="wizard">
        <Header />
        <h2>Find Your Car</h2>
        <input
          placeholder={
            this.props.model ? this.props.model : "Enter a Vehicle Model"
          }
          type="text"
          onChange={e => this.handleChange("model", e.target.value)}
        />
        <button
          onClick={() => this.props.history.push("/wizard1")}
          className="back-button"
        >
          Back
        </button>
        <button
          onClick={() => this.props.history.push("/wizard3")}
          className="next-button"
        >
          Next
        </button>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { model } = reduxState;
  return {
    model
  };
}

export default connect(mapStateToProps, { updateModel })(Wizard2);

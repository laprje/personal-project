import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { updateMake, updateModel, updateYear } from "../../ducks/reducer";

class Wizard1 extends Component {

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { updateMake, updateModel, updateYear } = this.props;
    return (
      <div className="wizard">
        <Header />
        <h2>Find Your Car</h2>
        <div className="inputs">
          <input
            placeholder={
              this.props.make ? this.props.make : "Enter a Vehicle Make"
            }
            type="text"
            onChange={e => updateMake(e.target.value)}
          />
          <input
            placeholder={
              this.props.model ? this.props.model : "Enter a Vehicle Model"
            }
            type="text"
            onChange={e => updateModel(e.target.value)}
          />
          <input
            placeholder={
              this.props.year ? this.props.year : "Enter a Vehicle Year"
            }
            type="text"
            onChange={e => updateYear(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button
            onClick={() => this.props.history.push("/home")}
            className="back-button"
          >
            Back
          </button>
          <button
            onClick={() => this.props.history.push("/vehicle")}
            className="next-button"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { make, model, year } = reduxState;
  return {
    make, model, year
  };
}

export default connect(mapStateToProps, { updateMake, updateModel, updateYear })(Wizard1);

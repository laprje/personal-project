import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { updateMake, updateModel, updateYear } from "../../ducks/reducer";
import "./Wizard.css";
import axios from "axios";

class Wizard1 extends Component {
  constructor() {
    super();
    this.state = {
      makes: [],
      chosenMake: "",
      models: [],
      chosenModel: "",
      years: [
        2020,
        2019,
        2018,
        2017,
        2016,
        2015,
        2014,
        2013,
        2012,
        2011,
        2010,
        2009,
        2008,
        2007,
        2006,
        2005,
        2004,
        2003,
        2002,
        2001,
        2000,
        1999,
        1998,
        1997,
        1996,
        1995,
        1994,
        1993,
        1992,
        1991,
        1990
      ],
      chosenYear: ""
    };
    this.getModels = this.getModels.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://www.trueavm.com/trueavm/autoMakes.do?key=85ut2hrj7ps4u8xwhv64"
      )
      .then(res => {
        this.setState({ makes: res.data });
      });
  }

  getModels() {
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoModels.do?make=${this.state.chosenMake}&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        this.setState({ models: res.data });
      });
  }

  render() {
    const { updateMake, updateModel, updateYear } = this.props;

    return (
      <div className="wizard">
        <Header />
        <div className="container">
          <h2 className="wizard-header">Find Your Car</h2>
          <div className="inputs">
            <select
              className="make"
              name="make"
              value={this.state.chosenMake}
              onChange={e => {
                this.setState({ chosenMake: e.target.value }, () => {
                  this.getModels();
                });
                updateMake(e.target.value);
              }}
            >
              <option>Select a Vehicle Make</option>
              {this.state.makes.map(el => {
                return <option value={el.value}>{el}</option>;
              })}
            </select>
            <select
              className="model"
              name="model"
              onChange={e => {
                this.setState({ chosenModel: e.target.value });
                updateModel(e.target.value);
              }}
            >
              <option>Select a Model</option>
              {this.state.models.map(el => {
                return <option value={el.value}>{el}</option>;
              })}
            </select>
            <select className="year" name="year" onChange={e => {
              this.setState({ chosenYear: e.target.value})
              updateYear(e.target.value)
              }}>
              <option>Select A Year</option>
              {this.state.years.map(el => {
                return <option value={el.value}>{el}</option>;
              })}
            </select>
          </div>

          
            {/* // inputs from before adding dropdown // */}
            {/* <input
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
          /> */}
          <div className="buttons">
            <button
              onClick={() => this.props.history.push("/home")}
              className="back-button"
            >
              Cancel
            </button>
            <button
              onClick={() => this.props.history.push("/vehicle")}
              className="next-button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { make, model, year } = reduxState;
  return {
    make,
    model,
    year
  };
}

export default connect(mapStateToProps, {
  updateMake,
  updateModel,
  updateYear
})(Wizard1);

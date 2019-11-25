import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { updateMake, updateModel, updateYear } from "../../ducks/reducer";
import './Wizard.css'
import axios from 'axios'

class Wizard1 extends Component {

  constructor() {
    super()
    this.state = {
      makes: ''
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { updateMake, updateModel, updateYear } = this.props;
   
    // axios.get('https://www.trueavm.com/trueavm/autoMakes.do?key=85ut2hrj7ps4u8xwhv64').then(res => {
    //    this.setState({makes: res.data})
    //    console.log(this.state.makes)
    // })
    
    return (
      <div className="wizard">
        <Header />
        <div className="container">
        <h2 className="wizard-header">Find Your Car</h2>
        <div className="inputs">
          {/* <select className="make" id="">
            {}
          </select>
          <select className="model" id=""></select>
          <select className="year" id=""></select> */}
          {/* // inputs from before adding dropdown // */}
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
    make, model, year
  };
}

export default connect(mapStateToProps, { updateMake, updateModel, updateYear })(Wizard1);







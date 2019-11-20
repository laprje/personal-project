import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import axios from "axios";


class Vehicle extends Component {
  constructor() {
    super();
    this.state = {
      carOnDisplay: {
        make: "",
        model: "",
        year: "",
        img: ""
      }
    };
  }

  getCar() {
      const {make, model, year} = this.props
    axios.post("/api/car", {make, model, year}).then(res => {
      this.setState({
        carOnDisplay: res.data
      },() => console.log(this.state));
    });
  }

  componentDidMount() {
    this.getCar();
  }

  render() {
      ///you're almost there. You just need to get the values onto state and then display them.
    return (
      <div>
        <Header />
        <h3>{this.state.carOnDisplay.year}</h3>
        <h3>{this.state.carOnDisplay.make}</h3>
        <h3>{this.state.carOnDisplay.model}</h3>
        <img src={this.state.carOnDisplay.img} alt="" />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps)(Vehicle);

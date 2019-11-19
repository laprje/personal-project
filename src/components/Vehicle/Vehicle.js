import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import axios from "axios";
import { updateYear } from "../../ducks/reducer";

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
    axios.get("/api/car", this.props).then(res => {
      console.log(res);
      this.setState({
        carOnDisplay: res.data
      });
    });
  }

  componentDidMount() {
    this.getCar();
  }

  render() {
    return (
      <div>
        <Header />
        <h3>{this.props.year}</h3>
        <h3>{this.props.make}</h3>
        <h3>{this.props.model}</h3>
        <img src={this.props.img} alt="" />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, {
  updateYear
})(Vehicle);

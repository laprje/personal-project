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
    const { make, model, year } = this.props;
    axios.post("/api/car", { make, model, year }).then(res => {
      this.setState({
        carOnDisplay: res.data
      });
    });
  }

  componentDidMount() {
    this.getCar();
  }

  render() {
    ///you're almost there. You just need to get the values onto state and then display them.

    const { carOnDisplay } = this.state;
    return (
      <div className="vehicle">
        <Header />
        {carOnDisplay.length === 1 ? (
          <div>
            <h3>{this.state.carOnDisplay[0].year}</h3>
            <h3>{this.state.carOnDisplay[0].make}</h3>
            <h3>{this.state.carOnDisplay[0].model}</h3>
            <img src={this.state.carOnDisplay[0].img} alt="" />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps)(Vehicle);

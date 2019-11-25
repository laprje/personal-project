import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import './Vehicle.css'

class Vehicle extends Component {
  constructor() {
    super();
    this.state = {
      carOnDisplay: {
        make: "",
        model: "",
        year: "",
        img: ""
      },
      data: {
        labels: [],
        datasets: [
          {
            label: "Value ($USD)",
            data: [],
            borderColor: ["rgb(106, 226, 160)"],
          }
        ]
      }
    };
  }

  getCar() {
    const { make, model, year } = this.props;
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoValue.do?make=${make}&model=${model}&year=${year}&count=5&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {

     

        let key = 'data'
        

        const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            datasets: [
              {
              label: "Value ($USD)",
              data: res.data.map(el => el["value"].split('').filter((el) => arr.includes(el)).join('')),
              borderColor: ["rgb(106, 226, 160)"],
              fillColor: "rgb(106, 226, 160)",
              fillOpacity: .3
            }
          ]
          }}),()=>console.log(this.state.data.datasets[0])
          
          )

        this.setState(
          prevState => ({
            data: {
              ...prevState.data,
              labels: res.data.map(el => {
                return el.date;
              })
            }
          })
        );
      });
  }

  componentDidMount() {
    this.getCar();
  }

  render() {
    return (
      <div className="vehicle">
        <Header />
        {this.props.make && this.props.model && this.props.year ? (
          <div className="car-info">
            <h3>{this.props.year}</h3>
            <h3>{this.props.make}</h3>
            <h3>{this.props.model}</h3>
            {/* <img src={this.state.carOnDisplay[0].img} alt="" /> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="chart-container">
          <Line 
          data={this.state.data} options={{
            title:{
              display: true,
              text: `Your ${this.props.year} ${this.props.make} ${this.props.model}'s expected value over the next 5 years`
            }
          }} 
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps)(Vehicle);

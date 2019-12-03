import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./Vehicle.css";
import { updateMake, updateModel, updateYear } from "../../ducks/reducer";


class SavedVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carOnDisplay: {
        make: "",
        model: "",
        year: "",
        img: ""
      },
      finishedSearch: false,
      data: {
        labels: [],
        datasets: [
          {
            label: `${props.year} ${props.make} Value ($USD)`,
            data: [],
            borderColor: ["rgb(106, 226, 160)"]
          }
        ]
      },
      makes: [],
      chosenMake: props.make,
      models: [],
      chosenModel: props.model,
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
      chosenYear: props.year
    };
  }

  goBack = () => {
    this.props.history.push("/wizard1");
  };

  getCar() {
    const { savedMake, savedModel, savedYear } = this.props;
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoValue.do?make=${savedMake}&model=${savedModel}&year=${savedYear}&count=5&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        // let key = "data";

        const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            datasets: [
              {
                label: "Value ($USD)",
                data: res.data.map(el =>
                  el["value"]
                    .split("")
                    .filter(el => arr.includes(el))
                    .join("")
                ),
                borderColor: ["rgb(106, 226, 160)"],
                fillColor: "rgb(106, 226, 160)",
                fillOpacity: 0.3
              }
            ]
          }
        }));

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            labels: res.data.map(el => {
              return el.date;
            })
          }
        }));
      });
  }

  componentDidMount() {
    this.getCar();
  }

  render() {
    // const { updateMake, updateModel, updateYear } = this.props;
    return (
      <div className="vehicle">
        
        {this.props.savedMake && this.props.savedModel && this.props.savedYear ? (
          <div className="car-info">
            <h3>{this.props.savedYear}</h3>
            <h3>{this.props.savedMake}</h3>
            <h3>{this.props.savedModel}</h3>
            {/* <img src={this.state.carOnDisplay[0].img} alt="" /> */}
          </div>
        ) : (
          null
        )}
        <div className="chart-container">
       
        <div className="chart-row">
        <Line
          data={this.state.data}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `Your ${this.props.savedYear} ${this.props.savedMake} ${this.props.savedModel}'s expected value over the next 5 years`
            },
            scales: {
              yAxes: [
                {
                  ticks: { beginAtZero: true }
                }
              ]
            }
          }}
        />
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
})(SavedVehicle);
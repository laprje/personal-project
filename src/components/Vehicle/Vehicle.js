import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./Vehicle.css";
import { updateMake, updateModel, updateYear } from "../../ducks/reducer";


class Vehicle extends Component {
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
    const { make, model, year } = this.props;
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoValue.do?make=${make}&model=${model}&year=${year}&count=5&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        let key = "data";

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
        `https://www.trueavm.com/trueavm/autoModels.do?make=${this.state.chosenMake ? this.state.chosenMake : this.props.make}&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        this.setState({ models: res.data });
      });
  }

  addCar() {
    const {make, model, year, email} = this.props;
    axios
      .post('/api/saved', {make, model, year, email})
      .then(() => {
        this.props.history.push('/profile')
      })
  }


  render() {
    // const { updateMake, updateModel, updateYear } = this.props;
    return (
      <div className="vehicle">
        <Header />
        <div className="top-left-container">
          <button onClick={this.goBack} className="back-btn">
            <i class="fas fa-chevron-left"></i>
          </button>

          <div className="hidden-text">Back to Search Page</div>
        </div>
        {this.props.make && this.props.model && this.props.year ? (
          <div className="car-info">
            <h3>{this.props.year}</h3>
            <h3>{this.props.make}</h3>
            <h3>{this.props.model}</h3>
            {/* <img src={this.state.carOnDisplay[0].img} alt="" /> */}
          </div>
        ) : (
          null
        )}
        <div className="chart-container">
        {this.state.finishedSearch ? 
        <div className="chart-row">
        <Line
          data={this.state.data}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `Your ${this.props.year} ${this.props.make} ${this.props.model}'s expected value over the next 5 years`
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
      : <p>Please Select your Car Below</p>
      }
          
        </div>
        <div className="search-row">
          <div className="inputs">
            <select
              className="make"
              name="make"
              value={this.state.chosenMake}
              onChange={e => {
                this.setState({ chosenMake: e.target.value }, () => {
                  this.getModels();
                });
                this.props.updateMake(e.target.value);
              }}
            >
              <option>{this.props.make}</option>
              {this.state.makes.map(el => {
                return <option value={el.value}>{el}</option>;
              })}
            </select>
            <select
              className="model"
              name="model"
              value={this.state.chosenModel}
              onChange={e => {
                this.setState({ chosenModel: e.target.value }, () => {
                });
                this.props.updateModel(e.target.value);
              }}
            >
              <option>{this.props.model}</option>
              {this.state.models.map(el => {
                return <option value={el.value}>{el}</option>;
              })}
            </select>
            <select
              className="year"
              name="year"
              value={this.state.chosenYear}
              onChange={e => {
                this.setState({ chosenYear: e.target.value }, () => {
                });
                this.props.updateYear(e.target.value);
              }}
            >
              <option>{this.props.year}</option>
              {this.state.years.map(el => {
                return <option value={el.value}>{el}</option>;
              })}
            </select>
          </div>
          <button
            onClick={() => {
              this.setState({...this.state, finishedSearch: true})
              this.props.history.push('/wizard1')
              this.props.history.push('/vehicle')
              this.getCar();
             }}
            className="next-button"
          >
            Search
          </button>
          <button className="save-button"onClick={() => {this.addCar()}}>Save This Car</button>
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
})(Vehicle);
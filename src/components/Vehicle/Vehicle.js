import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./Vehicle.css";
import {
  updateMake,
  updateModel,
  updateYear,
  updateSecondMake,
  updateSecondModel,
  updateSecondYear
} from "../../ducks/reducer";
import Loading from "../Loading/Loading";

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      secondCar: false,
      finishedSearch: false,
      data: {
        labels: [],
        datasets: [
          {
            label: `Value ($USD)`,
            data: [],
            borderColor: ["rgb(106, 226, 160)"]
          }
        ]
      },
      makes: [],
      chosenMake: props.make,
      secondMake: "",
      models: [],
      secondModels: [],
      chosenModel: props.model,
      secondModel: "",
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
      chosenYear: props.year,
      secondYear: ""
    };
  }

  goBack = () => {
    this.props.history.push("/wizard1");
  };

  //get first car //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getCar() {
    const { make, model, year } = this.props;
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoValue.do?make=${make}&model=${model}&year=${year}&count=5&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            datasets: [
              {
                label: `${this.state.chosenMake} ${this.state.chosenModel} Value ($USD)`,
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
    console.log(this.state);
  }

  //get second car ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getSecondCar() {
    const { secondMake, secondModel, secondYear } = this.state;
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoValue.do?make=${secondMake}&model=${secondModel}&year=${secondYear}&count=5&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

        const newData = {
          label: `${this.state.secondMake} ${this.state.secondModel} Value ($USD)`,
          data: res.data.map(el =>
            el["value"]
              .split("")
              .filter(el => arr.includes(el))
              .join("")
          ),
          borderColor: ["rgb(48, 188, 237)"],
          fillColor: "rgb(48, 188, 237)",
          fillOpacity: 0.3
        };

        this.state.data.datasets.push(newData);

        // this.setState(prevState => ({
        //   data: {
        //     ...prevState.data,
        //     datasets: [...prevState.data.datasets,
        //       {
        //         label: "Value ($USD)",
        //         data: res.data.map(el =>
        //           el["value"]
        //             .split("")
        //             .filter(el => arr.includes(el))
        //             .join("")
        //         ),
        //         borderColor: ["rgb(48, 188, 237)"],
        //         fillColor: "rgb(48, 188, 237)",
        //         fillOpacity: 0.3
        //       }
        //     ]
        //   }
        // }));

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            labels: res.data.map(el => {
              return el.date;
            })
          }
        }));
      });
    console.log(this.state);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
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
        `https://www.trueavm.com/trueavm/autoModels.do?make=${
          this.state.chosenMake ? this.state.chosenMake : this.props.make
        }&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        this.setState({ models: res.data });
      });
  }

  getSecondModels() {
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoModels.do?make=${this.state.secondMake}&key=85ut2hrj7ps4u8xwhv64`
      )
      .then(res => {
        this.setState({ secondModels: res.data });
      });
  }

  addCar() {
    const { make, model, year, email } = this.props;
    axios.post("/api/saved", { make, model, year, email }).then(() => {
      this.props.history.push("/profile");
    });
  }

  render() {
    return (
      <>
        {this.state.loading && (
          <>
            <Header></Header>
            <div className="loading">
              <Loading />
            </div>
          </>
        )}
        {!this.state.loading && (
          <div className="vehicle">
            <Header />
            <div className="top-left-container">
              <button onClick={this.goBack} className="back-btn">
                <i class="fas fa-chevron-left"></i>
              </button>

              <div className="hidden-text">Back to Search Page</div>
            </div>
            {this.state.chosenMake && this.state.chosenModel && this.state.chosenYear ? (
              <div className="car-info">
                <h3>{this.state.chosenYear}</h3>
                <h3>{this.state.chosenMake}</h3>
                <h3>{this.state.chosenModel}</h3>
              </div>
            ) : null}
            {this.state.secondMake && this.state.chosenModel && this.state.chosenYear && this.state.secondCar ? (
              <div className="car-info">
              <h3>{this.state.secondYear}</h3>
              <h3>{this.state.secondMake}</h3>
              <h3>{this.state.secondModel}</h3>
            </div>
            ): null}
            <div className="chart-container">
              {this.state.finishedSearch ? (
                <div className="chart-row">
                  <Line
                    data={this.state.data}
                    options={{
                      maintainAspectRatio: false,
                      title: {
                        display: true,
                        text: `Expected value over the next 5 years`
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
              ) : (
                <p>Please Select your Car Below</p>
              )}
            </div>
            {
              //FIRST CAR////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }
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
                    this.setState({ chosenModel: e.target.value }, () => {});
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
                    this.setState({ chosenYear: e.target.value }, () => {});
                    this.props.updateYear(e.target.value);
                  }}
                >
                  <option>{this.props.year}</option>
                  {this.state.years.map(el => {
                    return <option value={el.value}>{el}</option>;
                  })}
                </select>
              </div>
              {
                //SECOND CAR ///////////////////////////////////////////////////////////////////////////////////
              }
              {this.state.secondCar && (
                <>
                  <div className="inputs">
                    <select
                      className="make"
                      name="make"
                      value={this.state.secondMake}
                      onChange={e => {
                        this.setState({ secondMake: e.target.value }, () => {
                          this.getSecondModels();
                          console.log(this.state);
                        });
                        this.props.updateSecondMake(e.target.value);
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
                      value={this.state.secondModel}
                      onChange={e => {
                        this.setState(
                          { secondModel: e.target.value },
                          () => {}
                        );
                        this.props.updateSecondModel(e.target.value);
                      }}
                    >
                      <option>{this.props.model}</option>
                      {this.state.secondModels.map(el => {
                        return <option value={el.value}>{el}</option>;
                      })}
                    </select>
                    <select
                      className="year"
                      name="year"
                      value={this.state.secondYear}
                      onChange={e => {
                        this.setState({ secondYear: e.target.value }, () => {});
                        this.props.updateSecondYear(e.target.value);
                      }}
                    >
                      <option>{this.props.year}</option>
                      {this.state.years.map(el => {
                        return <option value={el.value}>{el}</option>;
                      })}
                    </select>
                  </div>
                  <button
                    className="next-button"
                    onClick={() => {
                      console.log(this.state);
                      this.getSecondCar();
                    }}
                  >
                    Add This Car
                  </button>
                  <button
                    className="next-button"
                    onClick={() => {
                      this.setState({ secondCar: false });
                      this.state.data.datasets.length = 1
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  this.setState({ ...this.state, finishedSearch: true });
                  this.props.history.push("/wizard1");
                  this.props.history.push("/vehicle");
                  this.getCar();
                }}
                className="next-button"
              >
                Search
              </button>
              {!this.state.secondCar && (
                <>
                  <button
                    className="next-button"
                    onClick={() => {
                      this.setState({ secondCar: true });
                    }}
                  >
                    Compare Cars
                  </button>
                  <button
                    className="save-button"
                    onClick={() => {
                      this.addCar();
                    }}
                  >
                    Save This Car
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  const { make, model, year, secondMake, secondModel, secondYear } = reduxState;
  return {
    make,
    model,
    year,
    secondMake, 
    secondModel,
    secondYear
  };
}

export default connect(mapStateToProps, {
  updateMake,
  updateModel,
  updateYear,
  updateSecondMake,
  updateSecondModel,
  updateSecondYear
})(Vehicle);

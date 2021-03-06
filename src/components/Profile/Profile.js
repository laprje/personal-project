import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import "./Profile.css";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import Swal from "sweetalert2";
import SavedVehicle from "../Vehicle/SavedVehicle";
import Loading from "../Loading/Loading";
import {updateUser} from '../../ducks/reducer';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: props.email,
      editToggle: false,
      make: "",
      model: "",
      year: "",
      loading: true
    };
    this.baseState = this.state;
    this.clearForm = this.clearForm.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.getCar = this.getCar.bind(this);
  }

  getCar() {
    const { make, model, year } = this.state;
    axios
      .get(
        `https://www.trueavm.com/trueavm/autoValue.do?make=${make}&model=${model}&year=${year}&count=5&key=85ut2hrj7ps4u8xwhv64`
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


  async componentDidMount(req, res) {
    
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
    await axios.get("/auth/getSession").then(res => {
      // console.log(res.data)
      this.setState({ user: res.data, email: res.data.email });
      
      // console.log(this.props.user)
    });
    if (!this.state.user.email) {
      this.props.history.push("/");
      console.log('no user!!!')
    } else {
      // console.log(this.state.user);
      this.props.updateUserInfo({email: this.state.email})
      this.props.updateUser({user: this.state.user})
    }
    // axios.get("/api/auth/me").then(user => {
    //   this.setState({
    //     user: user.data,
    //     email: user.data.email
    //   });
    // });
    if (this.state.user.email) {
      axios.get(`/api/cars/${this.props.email}`).then(res => {
        if (res.data[0].cars) {
          let car = JSON.parse(res.data[0].cars);
          this.setState({
            make: car.make,
            model: car.model,
            year: car.year
          });
        }
      });
      this.getCar();
    }
  }

  

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  saveChanges() {
    axios
      .put(`/api/user/${this.props.user_id}`, this.state)
      .then(res => {
        this.setState({
          user: res.data
        });
        this.props.updateUserInfo({ email: this.state.email });
        Swal.fire({
          title: "Email Address Changed!",
          icon: "success"
        });
      })
      .catch(err => {
        console.log(err);
        if (!this.state.email) {
          Swal.fire({
            title:
              "There was an error trying to change your email address. Please try again.",
            icon: "warning"
          });
        }
      });
  }

  toggleEdit() {
    this.setState({
      editToggle: !this.state.editToggle
    });
    if (this.state.editToggle && this.state.email) {
      this.saveChanges();
    }
  }

  clearForm() {
    const form = document.getElementById("form");
    form.reset();
    this.setState(this.baseState);
  }

  logout = () => {
    axios.post("/auth/logout").then(res => {
      this.props.updateUserInfo({
        email: "",
        name: "",
        user_id: "",
        profile_img: ""
      });
      this.props.history.push("/");
    });
  };

  deleteAccount() {
    axios
      .delete(`/api/user/${this.props.user_id}`)
      .then(() => {
        this.logout();
        Swal.fire({
          title: "Account Deleted",
          icon: "success",
          text: "We're sad to see you go!"
        });
      })
      .catch(err => console.log(err));
  }

  hehe() {
    console.log(this.props)
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
          <>
            <Header />
            <div className="profile">
              <h2>Your Account</h2>
              <div className="profile-box">
                <div className="left-box">
                  <i className="profile-icon" className="fas fa-user"></i>
                </div>
                <div className="right-box">
                  <div className="email">
                    {this.state.email && (
                      <h4>Email Address: {this.state.email}</h4>
                    )}
                  </div>
                  {this.state.editToggle ? (
                    <div className="edit-input">
                      <br />
                      <form id="form">
                        <input
                          placeholder={this.state.email}
                          onChange={e =>
                            this.handleChange("email", e.target.value)
                          }
                        />
                      </form>
                    </div>
                  ) : null}
                  <button
                    className="edit-btn"
                    onClick={() => {
                      this.toggleEdit();
                      // this.hehe()
                    }}
                  >
                    Change Email
                  </button>
                </div>
              </div>
              {this.state.make && this.state.model && this.state.year ? (
                <div className="saved-box">
                  <h4>Your Car</h4>
                  <div className="mmy-box">
                    <SavedVehicle
                      savedMake={this.state.make}
                      savedModel={this.state.model}
                      savedYear={this.state.year}
                    />
                  </div>
                </div>
              ) : (
                <p>
                  You don't have a saved car yet! Go to the car search to save
                  one!
                </p>
              )}
              <button className="delete-btn" onClick={this.deleteAccount}>
                {" "}
                Delete Account{" "}
              </button>
            </div>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  const {user, email, user_id} = reduxState;
  return {
    user, email, user_id
  };
}

export default connect(mapStateToProps, { updateUserInfo, updateUser })(Profile);

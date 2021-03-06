import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./Login.css";
import Swal from "sweetalert2";

class StripeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      amount: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let { token } = await this.props.stripe.createToken({
        name: this.state.name
      });
      let amount = this.state.amount;
      if (amount >= 8) {
        await fetch("/auth/payment", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({ token, amount })
          });
        this.props.register();
      } else {
          Swal.fire({
              title: "Insufficient Payment. $8 required to access.",
              icon: 'error'
          })
      }
     
      // redirect, clear inputs, thank alert, toast
      
    } catch (e) {
      throw e;
    }
  };
  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <main className="form-container">
        <form className="stripe-form" onSubmit={this.handleSubmit}>
          <h4 className="x" onClick={this.props.registerButton}>
            X
          </h4>
          <img className="by-stripe" src="assets/stripe.png" alt="stripe" />
          <label>Name</label>
          <input
            type="text"
            className="name-input"
            value={this.state.name}
            onChange={e => this.handleChange("name", e.target.value)}
          />
          <label>Amount (8 $USD)</label>
          <input
            type="text"
            className="value-input"
            value={this.state.amount}
            onChange={e => this.handleChange("amount", e.target.value)}
          />
          <label>Card Info</label>
          <CardElement className="card-element" />
          <button className="submit-btn">Confirm Payment</button>
        </form>
      </main>
    );
  }
}

export default injectStripe(StripeForm);

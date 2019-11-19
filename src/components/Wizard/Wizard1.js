import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from 'react-redux'
import { updateMake } from '../../ducks/reducer'

class Wizard1 extends Component {

  componentDidMount() {
    console.log(this.props)
}

handleChange = (key, value) => {
  this.setState({ [key]: value });
};

  render() {
    return (
      <div className="wizard">
        <Header />
        <h2>Find Your Car</h2>
        <input
        placeholder={this.props.make ? this.props.make : "Enter a Vehicle Make"}
        type="text"
        onChange={e => this.handleChange("make", e.target.value)}
        />
          <button onClick={() => this.props.history.push('/home')} className="back-button">Back</button>
          <button onClick={() => this.props.history.push('/wizard2')} className="next-button">Next</button>
      </div>
    );
  }
}

function mapStateToProps( reduxState ) {
  const {make} = reduxState;
  return {
    make
  }
}

export default connect(mapStateToProps, {updateMake})(Wizard1);

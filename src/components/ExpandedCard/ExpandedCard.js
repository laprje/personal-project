import React, { Component } from "react";
import {connect} from 'react-redux'
import {updateSelected} from '../../ducks/reducer'
import FastAverageColor from 'fast-average-color'

import "./ExpandedCard.css";



class ExpandedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentWillMount() {
    const fac = new FastAverageColor();
    // dominant color select
  }

  render() {
    return (
      <div className="expanded-card">
        <div className="exit">
          <button className="exit-btn" onClick={() => this.props.updateSelected({})}><i className="fas fa-times"></i></button>
        </div>
        <div className="info">
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { selected } = reduxState;
  return {
    selected
  };
}

export default connect(mapStateToProps, {
  updateSelected
})(ExpandedCard);


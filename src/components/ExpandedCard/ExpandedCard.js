import React, { Component } from "react";
import {connect} from 'react-redux'
import {updateSelected} from '../../ducks/reducer'

import "./ExpandedCard.css";

class ExpandedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    return (
      <div className="expanded-card">
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


import React, { Component } from "react";

import "./ExpandedCard.css";

export default class ExpandedCard extends Component {
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

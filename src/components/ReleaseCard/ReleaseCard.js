import React, {Component} from "react";

import "./ReleaseCard.css";

export default class ReleaseCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            expanded: false
        }
    }

  render() {
    return (
        <div className="release-card">
        <div className="card-info">
            <div className="img-container">
            <img
                className="car-image"
                src={this.props.image ? this.props.image : "assets/img-not-found.png"}
                alt={`${this.props.make + this.props.model}`}
            />
            </div>
            <div className="right-box">
                <h2>{this.props.make?this.props.make:'vOlVo'} {this.props.model?this.props.model:'V60'}</h2>
                <div className="info">
                    <h6>Release Date: {this.props.release_date?this.props.release_date:'N/A'}</h6>
                    <h6>MSRP: {this.props.base_msrp?"$"+this.props.base_msrp:'N/A'}</h6>
                    <h6>Engine: {this.props.top_engine?this.props.top_engine:(this.props.bottom_engine?this.props.bottom_engine:"N/A")}</h6>
                    {/* <h6> 0-60: {this.props.zero_to_sixty?this.props.zero_to_sixty + " seconds":'N/A'}</h6> */}
                </div>
            </div>
            <button className="expand"><i className="fas fa-chevron-right"></i></button>
        </div>
        </div>
    );
    }
}

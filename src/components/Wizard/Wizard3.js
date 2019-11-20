// import React, { Component } from "react";
// import Header from "../Header/Header";
// import { connect } from "react-redux";
// import { updateMake, updateModel, updateYear } from "../../ducks/reducer";


// class Wizard3 extends Component {
//   componentDidMount() {
//     console.log(this.props);
//   }

//   handleChange = (key, value) => {
//     this.setState({ [key]: value });
//   };

  

//   render() {
//     return (
//       <div className="wizard">
//         <Header />
//         <h2>Find Your Car</h2>
//         <input
//           placeholder={
//             this.props.year ? this.props.year : "Enter a Vehicle Year"
//           }
//           type="text"
//           onChange={e => this.handleChange("year", e.target.value)}
//         />
//         <button
//           onClick={() => this.props.history.push("/wizard2")}
//           className="back-button"
//         >
//           Back
//         </button>
//         <button onClick={() => this.props.history.push('/vehicle')} className="next-button">
//           Finish
//         </button>
//       </div>
//     );
//   }
// }

// function mapStateToProps(reduxState) {
//   const { make, model, year } = reduxState;
//   return {
//    reduxState
//   };
// }

// export default connect(mapStateToProps, {
//   updateYear
// })(Wizard3);

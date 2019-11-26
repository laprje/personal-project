import React from 'react';
import './App.css';
import routes from './routes'

// const ProtectedRoute = ({ component: CompositionEvent, loggedIn, path, ...rest}) => {
//   return (
//     <Route 
//       path={path}
//       {...rest}
//       render={props => {
//         return loggedIn? <Comp {...props} /> 
//         : <Redirect to={{
//           pathname: '/',
//           state: {
//             prevLovation: path,
//             error: "You need to log in first!"
//           },
//         }}
//           />
//       }}
//       />
//   )
// }

function App() {
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;

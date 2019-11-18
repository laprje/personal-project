import React, { Component } from 'react'
import axios from 'axios' 
import Swal from 'sweetalert2'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (key, value) => {
    this.setState({[key]: value})
  }

  register = () => {
    const {email, password} = this.state
    axios
        .post('/auth/register', {email, password})
        .then( res => {
            Swal.fire({
                title: "Welcome to AutoValue!",
                icon: "success"
            })
            // this.props.updateUserInfo(res.data.user)
            this.props.history.push('/dashboard')
        })
        .catch(err => {
            Swal.fire({
                title: `Oops! Please try again.`,
                icon: "warning",
            })
        })
  }

  login = () => {
      const {email, password} = this.state
      axios
        .post('/auth/login', {email, password})
        .then(res => {
            Swal.fire({
                title: "Welcome back!",
                icon: "success"
            })
            // this.props.updateUserInfo(res.data.user)
            this.props.history.push('/dashboard')
        })
        .catch(err => {
            Swal.fire({
                title: `Oops! Please try again.`,
                icon: "warning",
            })
        })
  }

  
render() {
    return (
        <div>
            <input 
            type="text"
            value={this.state.email}
            placeholder='Email'
            onChange={e => this.handleChange('email', e.target.value)}
            />
            
            <input 
            value={this.state.password}
            placeholder='Password'
            type='password'
            onChange={e => this.handleChange('password', e.target.value)}
            />

            <button onClick={this.register} >Register</button>
            <button onClick={this.login} >Log In</button>
        </div>
    )
}
}

export default Login
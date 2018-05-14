import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import './../assets/css/login.css';
import { Register as register } from '../store/auth/auth.action'

class Register extends Component{
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div>
        <Header />
        <div className="box">
          <div className="form-register">
            <h2 className="logintitle">Register</h2>
            <div className="forminput">
              <input type="text" name="email" id="email" placeholder="input your email" onChange={ this.handleChange }/>
            </div>
            <div className="forminput">
              <input type="password" name="password" placeholder="input your password" onChange={ this.handleChange }/>
            </div>
            <div className="buttonsubmit" >
              <button onClick={ () => this.props.registerUser({...this.state}) }>Signin</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    registerUser: (payload) => dispatch(register(payload))
  }
}

export default connect(null, mapDispatchToProps)(Register)

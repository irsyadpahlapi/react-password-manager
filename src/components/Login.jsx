import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom"
import { connect } from 'react-redux'
import { signIn } from '../store/auth/auth.action'
import Header from './Header'
import './../assets/css/login.css';


class Login extends Component{
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
          <div className="form-login">
            <h2 className="logintitle">Login</h2>
            <div className="forminput">
              <input type="text" name='email' id="email" placeholder="input your email" onChange={ this.handleChange }/>
            </div>
            <div className="forminput">
              <input type="password" id="password" name='password' placeholder="input your password" onChange={ this.handleChange }/>
            </div>
            <div className="buttonsubmit" >
              <button onClick={ () => this.props.signInUser(this.state) }>Signin</button>
            </div>
            <div className="gotoregister">
              <Link to="/register"><span><i>Register</i></span></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    signInUser: (payload) => dispatch(signIn(payload))
  }
}

export default connect(null, mapDispatchToProps)(Login)

import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import EditForm from './components/EditForm'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' render={ (props) => (this.props.auth.isLogin) ? <Home /> : (<Redirect to='/login' />) } />
          <Route exact path='/login' render={ (props) => (this.props.auth.isLogin) ? (<Redirect to='/' />) : <Login />  } />
          <Route exact path='/register' render={ (props) => (this.props.auth.isLogin) ? (<Redirect to='/' />) : <Register />  } />
          <Route exact path="/editform/:id" component={ EditForm }/>
        </div>

      </BrowserRouter>
    );
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(App)

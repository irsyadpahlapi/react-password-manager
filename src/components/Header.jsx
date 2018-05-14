import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="App-logo2" alt="logo" />
        <h3 className="title">Password manager</h3>
      </header>
    );
  }
}

export default Header

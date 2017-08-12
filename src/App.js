import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './ui/LoginForm';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <LoginForm />
      </div>
    );
  }
}

export default App;

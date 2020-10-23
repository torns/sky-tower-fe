import React, { Component }  from 'react';
import LoginPage from './pages/LoginPage/index.jsx;
import HomePage from './pages/HomePage/index.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    }
  }

  render() {
    const { isLogin } = this.state;
    
    return (
      isLogin ? <LoginPage /> : <HomePage />
    );
  }
}

export default App;

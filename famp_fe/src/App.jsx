import React, { Component }  from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  onLoginSuccess = () => {
    this.setState({
      isLogin: true
    })
  }

  render() {
    const { isLogin } = this.state;
    
    return (
      isLogin ? <HomePage /> : <LoginPage onLoginSuccess={this.onLoginSuccess} />
    );
  }
}

export default App;

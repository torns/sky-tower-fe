import React, { Component }  from 'react';
import { Layout } from 'antd';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import './App.less';

const { Header, Sider, Content } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomePage: true,
      isLoginPage: false,
      isProfilePage: false,
    }
  }

  onLoginSuccess = () => {
    this.setState({
      isLogin: true
    })
  }

  locationHrefInApp = (component) => {
    if (component === 'profilePage') {
      this.setState({
        isHomePage: false,
        isLoginPage: false,
        isProfilePage: true,
      });
    } else if (component === 'homePage') {
      this.setState({
        isHomePage: true,
        isLoginPage: false,
        isProfilePage: false,
      });
    } else if (component === 'loginPage'){
      this.setState({
        isHomePage: false,
        isLoginPage: true,
        isProfilePage: false,
      });
    }
  }

  render() {
    const { isLogin, isHomePage, isLoginPage, isProfilePage } = this.state;
    
    return (
      // isLogin ? <HomePage /> : <LoginPage onLoginSuccess={this.onLoginSuccess} />
      <div>
        { isProfilePage && <ProfilePage locationHrefInApp={this.locationHrefInApp}/> }
        { isLoginPage && <LoginPage locationHrefInApp={this.locationHrefInApp}/> }
        { isHomePage && <HomePage locationHrefInApp={this.locationHrefInApp}/> }
      </div>
    );
  }
}

export default App;

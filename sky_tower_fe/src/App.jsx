import React, { Component }  from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import VConsole from 'vconsole/dist/vconsole.min';
import getEnv from './utils/getEnv.js';
import './App.less';

// 只有内测版的SkyTower才外露vConsole
const { env } = getEnv();
var vConsole = env === 'dev' ? new VConsole() : null;
console.log('Hello world', vConsole, getEnv());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/profile" component={ProfilePage}/>
        </div>
      </Router>
    );
  }
}

export default App;

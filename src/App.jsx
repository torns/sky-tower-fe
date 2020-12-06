import React, { Component }  from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import VConsole from 'vconsole/dist/vconsole.min';
import { init, emitter } from 'sky-tower';
import getEnv from './utils/getEnv.js';
import './App.less';
// import reqwest from 'reqwest';

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

  componentDidMount() {
    init({
      pid: '00001',
      uid: '789123654'
    });

    emitter.emitActionEvent({
        event: 'click_bottom_button',
        location: '北京市海淀区',
        device_brand: 'XIAO MI',
        app_version: '8.2.5',
        system_version: '9.2.0',
        client: 'Android',
        net_type: '4G',
        ip_address: '10.157.168.235',
        extra: {
            env: 'dev'
        }   
    });

    emitter.emitCountEvent('test_event');

    emitter.emitReqEvent({
        api: 'xxx/getUserInfo',
        query: 'user_id=987234&&user_name=secretttt&&user_type=vip'
    });

    emitter.emitReqEvent({
        api: 'xxx/updateUserInfo',
        request_body: '{"user_id": "987234", "user_name": "secretttt", "user_type": "vip"}'
    });

    emitter.emitRespEvent({
        api: 'xxx/updateUserInfo',
        resp: '{"status": 200}',
        is_success: true
    });

  //   reqwest({
  //     url: "http://localhost:8765/emit/count_event",
  //     method: 'post',
  //     type: 'json',
  //     crossOrigin: true, /* 跨域请求 */
  //     withCredentials: false,  /* 值为false，表示前端向服务端发请求时不带cookie */
  //     data: {
  //       event: 'click',
  //       type: 'count',
  //       time: 1606641411812,
  //       pid: '456789',
  //       uid: '2334233'
  //     }
  //   });
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

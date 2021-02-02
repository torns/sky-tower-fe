import React, { Component }  from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DetailPage from './pages/DetailPage';
import VConsole from 'vconsole/dist/vconsole.min';
import { init, emitter } from 'sky-tower';
import getEnv from './utils/getEnv.js';
// import reqwest from 'reqwest';
import './App.less';

// 只有内测版的SkyTower才外露vConsole
const { env } = getEnv();
const vConsole = env === 'dev' ? new VConsole() : null;
if (vConsole) {
  console.log('SkyTower前端监控数据中心 内测版', vConsole, env);
}

// 网络请求host
// const server = 'localhostServer';
const server = 'SkyTowerServer';
window.requestUrl = 'http://101.200.197.197:8765';
if (server === 'localhostServer') {
  window.requestUrl = 'http://localhost:8765';
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    init({
      pid: '100113',
      uid: '0'
    });


    // for (let i = 0; i < 10; i++) {
    //   reqwest({
    //     url: "http://localhost:8765/emit/action_event",
    //     method: 'post',
    //     type: 'json',
    //     crossOrigin: true, /* 跨域请求 */
    //     withCredentials: false, /* 值为false，表示前端向服务端发请求时不带cookie */
    //     data: {
    //       type: 'action',
    //       time: new Date().getTime(),
    //       pid: 100129,
    //       uid: 10088888,
    //       event: 'image_upload',
    //       location: '南宁市江南区',
    //       device_brand: 'iPhone 11',
    //       app_version: '8.3.5',
    //       system_version: '9.2.0',
    //       client: 'iOS',
    //       net_type: 'wifi',
    //       ip_address: '10.102.168.250',
    //       extra: JSON.stringify({
    //           env: 'dev'
    //       })   
    //     }
    //   });
    // }

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

    for (let i = 0; i < 17; i++) {
      emitter.emitCountEvent('open_app');
      emitter.emitCountEvent('get_current_location');
    }

    for (let i = 0; i < 5; i++) {
      emitter.emitCountEvent('select_city');
    }

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
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/detail" component={DetailPage}/>
        </div>
      </Router>
    );
  }
}

export default App;

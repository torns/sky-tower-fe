import React, { Component }  from 'react';
import './index.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  gotoBaidu = () => {
    window.location.href = 'https://www.baidu.com';
  }

  render() {
    
    return (   
        <div>
            <div className="note">欢迎进入FA监控平台</div>
            <div className="note">不过，仍在开发中。。。现在啥也还没</div>
            <div className="note" onClick={this.gotoBaidu}>百度以下，你就知道</div>
        </div>
    );
  }
}

export default HomePage;
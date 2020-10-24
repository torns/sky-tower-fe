import React, { Component }  from 'react';
import './index.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    
    return (   
        <div>
            <div className="note">欢迎进入FA监控平台</div>
            <div className="note">不过，仍在开发中。。。现在啥也还没</div>
        </div>
    );
  }
}

export default HomePage;
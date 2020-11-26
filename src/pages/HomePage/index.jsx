import React, { Component }  from 'react';
import { PageHeader, Affix, Button, Card } from 'antd';
import { Link } from "react-router-dom";
import './index.less';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isDev: false
    }
  }

  render() {
    const { isLogin, isDev } = this.state;

    return (   
      <div className="home-page">
        <PageHeader
          className="home-page-header"
          backIcon={false}
          title="FA监控平台"
          subTitle="Flight Aware Monitoring Platform"
        />
        <Card
          hoverable
          style={{ width: '75%'}}
        >
          <Affix offsetTop={30}>
            <div className="home-page-affix">
              <Button style={{marginTop: 10,   marginLeft: 20, marginRight: 20 }} type="primary">
                快速开始
              </Button>
              {
                isLogin && <Button style={{marginTop: 10,   marginLeft: 20, marginRight: 20}} type="primary">
                  新建项目
                </Button>
              }
              {
                isLogin && <Link to='/profile'><Button style={{marginTop: 10,   marginLeft: 20, marginRight: 20}} type="primary">
                  我的项目
                </Button></Link>
              }
              {
                !isLogin && <Link to='/login'><Button style={{marginTop: 10,   marginLeft: 20, marginRight: 20}} type="primary">
                  用户登陆
                </Button></Link>
              }
              {
                !isLogin && <Link to='/login'><Button style={{marginTop: 10,   marginLeft: 20, marginRight: 20}} type="primary">
                注册账号
              </Button></Link>
              }
              {
                isDev && <Button style={{marginTop: 10,   marginLeft: 20, marginRight: 20}} type="primary">
                内测调试
              </Button>
              }
            </div>
          </Affix>
        </Card>
        <Card
          hoverable
          style={{ width: '75%', marginTop: 20, height: 2000 }}
        >
        </Card>
      </div>
    );
  }
}

export default HomePage;
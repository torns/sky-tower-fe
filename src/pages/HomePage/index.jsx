import React, { Component }  from 'react';
import { PageHeader, Affix, Button, Card, Input } from 'antd';
import { Link } from "react-router-dom";
import homePagePoster from './image/homePagePoster.jpg';
import './index.less';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isDev: false,
      loginInUsername: ''
    }
  }

  handleLoginInputChange = (e) => {
    this.setState({
      loginInUsername: e.target.value
    })
  }

  render() {
    const { isLogin, isDev, loginInUsername } = this.state;
    console.log(loginInUsername);
    const loginPath = {
      pathname: '/login',
      search: `?page_type=login&username=${loginInUsername}`
    };

    return (   
      <div className="container">
        <PageHeader
          className="home-page-header"
          backIcon={false}
          title="SkyTower 前端监控数据中心"
          subTitle="SkyTower front-end monitoring data center"
        />
        <div className="poster-background">
          <img className="poster" src={homePagePoster}/>
        </div>
        <div className="poster-title">
          <div className="poster-qa">
            <div className="poster-question">
              web网站、移动端h5监控？
            </div>
            <div className="poster-answer">
              接入SkyTower。
            </div>
          </div>
          <div className="poster-detail">
          一个PC端web网站或者移动端h5页面开发完成，
          在用户实际使用的过程中，由于实际设备、网络状态、使用方式等因素，
          可能会出现各种各样的问题。
          这些问题往往具有难以察觉、难以复现的特点，如果不能得到解决，会大大降低用户体验。
          基于这样的背景，SkyTower提供了一整套的解决方案。使用SkyTower，你只需要根据你项目中标识唯一用户的参数去追查用户的网络请求，难以复现的问题不至于没有任何头绪。
          你还可以使用SkyTower来给你的项目加打点，跟踪用户的使用情况，指导项目的优化...
          </div>
          <div className="poster-login-in">
            <Input placeholder="enter your username to login in" onChange={this.handleLoginInputChange} />
            <Link to={loginPath}>
              <Button 
                className="login-in-button" 
                type="primary" 
                shape="round" 
                size="large"
              >
                Login In
              </Button>
            </Link>
          </div>
        </div>
        <div className="home-page">
        </div>
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
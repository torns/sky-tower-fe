import React, { Component }  from 'react';
import { PageHeader, Button, Card, Input, Table, Image, Modal, Rate } from 'antd';
import { Link } from "react-router-dom";
import Codeblock from './components/Codeblock/index';
import { 
  columns, 
  initData, 
  initCode,
  posterQuestion,
  posterAnswer,
  posterDetail,
  ourLink,
  skyTowerFor,
  whySkyTower,
  emitterInfo
} from './const/const';
import homePagePoster from './image/homePagePoster.jpg';
import skyTowerDataFlow from './image/skytowerdataflow.png';
import './index.less';

const { Meta } = Card;
const { TextArea } = Input;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isDev: false,
      usernameForLogin: '',
      isModalVisible: false
    }
  }

  handleLoginInputChange = (e) => {
    this.setState({
      usernameForLogin: e.target.value
    })
    this.reportContent = '';
  }

  showModal = () => {
    this.setState({
      isModalVisible: true
    });
  };

  handleUpdateReportContent = (e) => {
    this.reportContent = e.target.value;
  }

  handleSubmitFeedback = (feedback_rate) => {
    console.log(feedback_rate, this.reportContent);
    this.setState({
      isModalVisible: false
    });
  }

  renderPageHeader = () => {
    // 注册页面路由
    const registerPath = {
      pathname: '/login',
      search: '?page_type=register'
    }

    return (
      <div className="page-header">
        <PageHeader
          className="page-header-nav"
          backIcon={false}
          title="SkyTower 前端监控数据中心"
          subTitle="SkyTower front-end monitoring data center"
        />
        <Link to={registerPath}>
          <div className="register-entrance" onClick={this.handleClickRegisterLink}>注册</div>
        </Link>
      </div>
    );
  }

  renderPoster = () => {
    const { usernameForLogin } = this.state;

    // 登陆页面路由
    const loginPath = {
      pathname: '/login',
      search: `?page_type=login&username=${usernameForLogin}`
    };

    return (
      <div>
        <div className="poster-background">
          <img className="poster" src={homePagePoster}/>
        </div>
        <div className="poster-title">
          <div className="poster-qa">
            <div className="poster-question">{posterQuestion}</div>
            <div className="poster-answer">{posterAnswer}</div>
          </div>
          <div className="poster-detail">{posterDetail}</div>
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
      </div>
    );
  } 

  renderBrief = () => {
    return (
      <div>
        <div className="title">
          使用 SkyTower 前端监控
        </div>
        <div className="small-image-card-container">
          {
            skyTowerFor.map((obj, index) => {
              return (
                <Card
                  index={index}
                  hoverable
                  style={{ height: '450px', margin: 24, borderRadius: 24 }}
                  cover={<Image width={330} src={obj.src} style={{borderRadius: 24}} />}
                >
                  <Meta title={obj.title} description={obj.description} />
                </Card>
              );
            })
          }
        </div>
        <div className="title">
          设计思路
        </div>
        <div className="image-card-container">
          <div className="small-image-card-container">
            {
              whySkyTower.map((obj, index) => {
                return (
                  <Card
                    index={index}
                    hoverable
                    style={{ width: '100%', margin: 24, borderRadius: 24 }}
                    cover={<Image src={obj.src} style={{borderRadius: 24}} />}
                  >
                    <Meta title={obj.title} description={obj.description}/>
                  </Card>
                );
              })
            }
          </div>
          <Card
            hoverable
            style={{ width: '100%', margin: 24, borderRadius: 24 }}
            cover={<Image src={skyTowerDataFlow} style={{borderRadius: 24}} />}
          >
            <Meta
              title="SkyTower 数据流" 
              description="SkyTower 数据流层次结构主要包括数据接入层、数据接口层、数据清洗层、数据存储层、业务逻辑层、数据展示层。" />
          </Card>
        </div>
      </div>
    );
  }

  renderWhoUserAndJoinUs = () => {
    return (
      <div>
        <div className="title">
          谁在使用
        </div>
        <div className="content">
          目前SkyTower仍在开发中...
        </div>

        <div className="title">
          加入我们
        </div>
        <div className="content">
          📖 SkyTower 相关文档：<a href={ourLink.doc}>{ourLink.doc}</a>
        </div>
        <div className="content">
          📱 SkyTower 前端： <a href={ourLink.front_end}>{ourLink.front_end}</a>
        </div>
        <div className="content">
          💻 SkyTower 服务端：<a href={ourLink.server}>{ourLink.server}</a>
        </div>
        <div className="content">
          📡 Emitter：<a href={ourLink.emitter}>{ourLink.emitter}</a>
        </div>
      </div>
    );
  }

  renderFeedbackContainer = () => {
    const { isModalVisible } = this.state;

    return (
      <div className="feedback-container">
        <Button type="primary" onClick={this.showModal}>
          体验反馈 🌝
        </Button>
        <Modal
          title={null}
          footer={null}
          style={{ position: 'absolute', right: 36, top: 575}}
          closable={false}
          visible={isModalVisible}
        >
          <div className="modal-form">
            <TextArea 
              rows={3} 
              allowClear={true} 
              bordered={false} 
              placeholder="可在此处输入反馈内容并给SkyTower打个分～"
              onChange={this.handleUpdateReportContent}
            />
            <Rate defaultValue={0} onChange={this.handleSubmitFeedback} />
          </div>
        </Modal>
      </div>
    );
  }

  renderQuickStart = () => {
    return (
      <div>
        <div className="title">
          快速开始
        </div>
        <div className="sub-title">
          1. 注册登陆、创建项目
        </div>
        <div className="content">
          注册并登陆SkyTower前端监控数据中心，点击创建一个新的项目。
          项目创建后，你将会获得一个project_id。这个字段是独一无二的，它用来标识你新建的这个项目。
        </div>
        <div className="sub-title">
          2. 安装Emitter
        </div>
        <div className="content">
          信号发射器是一个npm包，内部封装了用于初始化的init函数以及用于上报打点数据的emitter对象。
          要想使用它，需要在你的web项目或者移动端h5项目内引入信号发射器。
        </div>
        <Codeblock 
          code={`  npm install skytower`}
          language='text/mysql'
        />
        <div className="sub-title">
          3. 使用Emitter在代码中打点
        </div>
        <div className="content">
          首先需要调用init函数初始化SkyTower，还记得在创建项目时获得的那个project_id吗？
          在调用init函数时，你需要将这个project_id告诉init函数，SkyTower才知道接下来要上报的数据需要上报给哪个项目。
        </div>
        <div className="content">
          <Table columns={columns} dataSource={initData} pagination={false} />
        </div>
        <Codeblock code={initCode} language='jsx' />
        <div className="content">
          emitter对象提供了四个很实用的方法，它们分别是用于发射用户行为信号的emitActionEvent方法、
          用于发射计数信号emitCountEvent方法、用于发射请求参数信号emitReqEvent方法、用于发射响应参数信号emitRespEvent方法。
        </div>
        {
          emitterInfo.map((obj, index) => {
            return (
              <div key={index}>
                <div className="title-content">{obj.titleContent}</div>
                <div className="content">
                  <Table columns={columns} dataSource={obj.dataSource} pagination={false} />
                </div>
                <Codeblock code={obj.code} language='jsx' />
              </div>
            );
          })
        }
        <div className="sub-title">
          4. 查看监控数据
        </div>
        <div className="content">
          接入SkyTower，配置好Emitter之后就可以做前端监控了。你可以登陆SkyTower前端监控数据中心的项目详情里查看客户端上报的数据。
          使用这些数据，你可以监控产品的基本使用情况，可以使用打点数据做用户行为分析等数据分析，还可以对用户的请求和响应数据做监控，实现单点追查。
          总之，利用打点数据，你可以做很多很多的事情。
        </div>
      </div>
    );
  }

  render() {
    return (   
      <div className="home-page">
        { this.renderPageHeader() }
        { this.renderPoster() }
        <div className="home-page-container">
          <Card hoverable style={{ width: '80%', marginTop: 80, marginBottom: 80, borderRadius: 24 }}>
            { this.renderBrief() }
            { this.renderQuickStart() }
            { this.renderWhoUserAndJoinUs() }
          </Card>
        </div>
        { this.renderFeedbackContainer() }
      </div>
    );
  }
}

export default HomePage;
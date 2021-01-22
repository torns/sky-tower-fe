import React, { Component }  from 'react';
import { PageHeader, Button, Card, Input, Table, Image, Modal, Rate } from 'antd';
import { Link } from "react-router-dom";
import Codeblock from './components/Codeblock/index';
import homePagePoster from './image/homePagePoster.jpg';
import airportTower from './image/airportTower.jpg';
import skyTowerForPM from './image/skytowerForPM.png';
import skyTowerForRD from './image/skytowerForRD.png';
import skyTowerForDA from './image/skytowerForDA.png';
import skyTowerFlow from './image/skytowerflow.png';
import skyTowerDataFlow from './image/skytowerdataflow.png';
import './index.less';

const { Meta } = Card;
const { TextArea } = Input;

const columns = [
  {
    title: '字段名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '含义',
    dataIndex: 'mean',
    key: 'mean',
  },
  {
    title: '枚举值/如何获取',
    dataIndex: 'howToGet',
    key: 'howToGet',
  }
];

const initData = [
  {
    name: 'pid',
    type: 'string',
    mean: '项目id/页面id',
    howToGet: 'SkyTower监控平台上创建项目后得到的project_id',
  },
  {
    name: 'uid',
    type: 'string',
    mean: '区分不同的用户，用户统计uv，追查问题',
    howToGet: '用户自定义',
  },
];


const emitActionEventData = [
  {
    name: 'event',
    type: 'string',
    mean: '事件名称',
    howToGet: 'click_bottom_button',
  },
  {
    name: 'location',
    type: 'string',
    mean: '地理位置',
    howToGet: '北京市海淀区',
  },
  {
    name: 'device_brand',
    type: 'string',
    mean: '机型',
    howToGet: 'XIAO MI',
  },
  {
    name: 'app_version',
    type: 'string',
    mean: '页面版本号',
    howToGet: '8.2.5',
  },
  {
    name: 'system_version',
    type: 'string',
    mean: '系统版本号',
    howToGet: '9.2.0',
  },
  {
    name: 'client',
    type: 'string',
    mean: '客户端类型',
    howToGet: 'Android',
  },
  {
    name: 'net_type',
    type: 'string',
    mean: '网络类型',
    howToGet: '4G',
  },
  {
    name: 'ip_address',
    type: 'string',
    mean: 'ip地址',
    howToGet: '10.157.168.235',
  },
  {
    name: 'extra',
    type: 'object',
    mean: '自定义参数',
    howToGet: `{ env: 'dev' }`,
  },
];

const emitCountEventData = [
  {
    name: 'event',
    type: 'string',
    mean: '事件名称',
    howToGet: 'click_bottom_button',
  },
];

const emitReqEventData = [
  {
    name: 'api',
    type: 'string',
    mean: '接口地址',
    howToGet: 'xxx/getUserInfo',
  },
  {
    name: 'query',
    type: 'string',
    mean: 'get请求参数',
    howToGet: 'user_id=987234&&user_name=secretttt&&user_type=vip',
  },
  {
    name: 'request_body',
    type: 'string',
    mean: 'post请求参数',
    howToGet: '{"user_id": "987234", "user_name": "secretttt", "user_type": "vip"}',
  },
];

const emitRespEventData = [
  {
    name: 'is_success',
    type: 'boolean',
    mean: '成功',
    howToGet: '默认值false',
  },
  {
    name: 'is_error',
    type: 'boolean',
    mean: '失败',
    howToGet: '默认值false',
  },
  {
    name: 'api',
    type: 'string',
    mean: '接口地址',
    howToGet: 'xxx/getUserInfo',
  },
  {
    name: 'resp',
    type: 'object',
    mean: '返回参数',
    howToGet: `{ err_no: 0, err_msg: 'success'}`,
  },
];

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

  render() {
    const { usernameForLogin, isModalVisible } = this.state;
    
    // 登陆页面路由
    const loginPath = {
      pathname: '/login',
      search: `?page_type=login&username=${usernameForLogin}`
    };

    // 注册页面路由
    const registerPath = {
      pathname: '/login',
      search: '?page_type=register'
    }

    return (   
      <div className="home-page">
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
        <div className="home-page-container">
          <Card
            hoverable
            style={{ width: '80%', marginTop: 80, marginBottom: 80, borderRadius: 24 }}
          >
            <div className="title">
              使用 SkyTower 前端监控
            </div>
            <div className="small-image-card-container">
              <Card
                hoverable
                style={{ height: '450px', margin: 24, borderRadius: 24 }}
                cover={<Image width={330} src={skyTowerForPM} style={{borderRadius: 24}} />}
              >
                <Meta 
                  title="SkyTower For PM" 
                  description="接入SkyTower，
                  产品能够看到用户真实的使用情况数据，更能够站在用户的角度看问题，指导产品的更新迭代。" />
              </Card>
              <Card
                hoverable
                style={{ height: '450px', margin: 24, borderRadius: 24 }}
                cover={<Image width={330} src={skyTowerForRD} style={{borderRadius: 24}} />}
              >
                <Meta 
                  title="SkyTower For RD" 
                  description="接入SkyTower，
                  研发能够快速追查线上问题、接收到监控报警，线上bug尽快修复，提升用户体验。" />
              </Card>
              <Card
                hoverable
                style={{ height: '450px', margin: 24, borderRadius: 24 }}
                cover={<Image width={330} src={skyTowerForDA}style={{borderRadius: 24}} />}
              >
                <Meta 
                  title="SkyTower For DA" 
                  description="接入SkyTower，
                  数据分析师能够拿到真实的用户行为数据，做更多有意义的事。" />
              </Card>
            </div>
            <div className="title">
              设计思路
            </div>
            <div className="image-card-container">
              <div className="small-image-card-container">
                <Card
                  hoverable
                  style={{ width: '100%', margin: 24, borderRadius: 24 }}
                  cover={<Image src={airportTower} style={{borderRadius: 24}} />}
                >
                  <Meta 
                    title="AirportTower 全链路流程" 
                    description="AirportTower是机场塔台，或称控制塔，是一种设置于机场中的航空运输管制设施，
                    用来监看以及控制飞机起降的地方。机场塔台里可以监测到当日进出港机组排班情况，延误正点、航班号、
                    计划起飞时间、目的地、机型、停机位、离场信息、应答机号等信息。一般这些信息会在机组起飞或者准备降落时获得。
                    这和我们的网络请求是一样的，当页面向服务端发起请求或者接受响应时，我们如果能够将此次请求相关的参数上报给
                    一个类似“AirportTower”的监控平台，那么我们就可以在这个平台上看到各种各样的监控数据。"/>
                </Card>
                <Card
                  hoverable
                  style={{ width: '100%', margin: 24, borderRadius: 24 }}
                  cover={<Image src={skyTowerFlow} style={{borderRadius: 24}} />}
                >
                  <Meta 
                    title="SkyTower 全链路流程" 
                    description="SkyTower就是借鉴了这个思想，接入SkyTower的前端项目，在项目中部署Emitter，当对应的事件被触发，
                    Emitter就会向SkyTower发射信号。在SkyTower上就能够实时地监测到此次事件。"/>
                </Card>
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
              <Codeblock 
                code={`  import { init } from 'skytower';

  // init方法一般在constructor或者componentDidMount里调用
  init({
      pid: '987456',
      uid: this.state.user_id
  });`}
                language='jsx'
              />
              <div className="content">
                emitter对象提供了四个很实用的方法，它们分别是用于发射用户行为信号的emitActionEvent方法、
                用于发射计数信号emitCountEvent方法、用于发射请求参数信号emitReqEvent方法、用于发射响应参数信号emitRespEvent方法。
              </div>

              <div className="title-content">
                👉 emitter.emitActionEvent 上报用户行为事件
              </div>
              <div className="content">
                <Table columns={columns} dataSource={emitActionEventData} pagination={false} />
              </div>
              <Codeblock 
                code={`  import { emitter } from 'skytower';

  // 这些参数不是必传的
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
  });`}
              language='jsx'
            />

              <div className="title-content">
                👉 emitter.emitCountEvent 上报计数事件
              </div>
              <div className="content">
                <Table columns={columns} dataSource={emitCountEventData} pagination={false} />
              </div>
              <Codeblock 
                code={`  import { emitter } from 'skytower';

  emitter.emitCountEvent('image_upload');`}
              language='jsx'
            />

              <div className="title-content">
                👉 emitter.emitReqEvent 上报请求事件
              </div>
              <div className="content">
                <Table columns={columns} dataSource={emitReqEventData} pagination={false} />
              </div>
              <Codeblock 
                code={`  import { emitter } from 'skytower';

  emitter.emitReqEvent({
      api: 'xxx/getUserInfo',
      query: 'user_id=987234&&user_name=secretttt&&user_type=vip'
  });
  
  emitter.emitReqEvent({
      api: 'xxx/updateUserInfo',
      request_body: '{"user_id": "987234", "user_name": "secretttt", "user_type": "vip"}'
  });`}
              language='jsx'
            />

              <div className="title-content">
                👉 emitter.emitRespEvent 上报响应事件
              </div>
              <div className="content">
                <Table columns={columns} dataSource={emitRespEventData} pagination={false} />
              </div>
              <Codeblock 
                code={`  import { emitter } from 'skytower';

  const getUserInfo = async () => {
      const { user_id } = this.state;
      const { status, data = {} } = await getUserInfo(user_id);
      
      if (status === 0) {
        // 请求成功上报
        emitter.emitRespEvent({
          api: 'xxx/updateUserInfo',
          resp: data，
          is_success
        });
      } else {
        // 请求失败上报
        emitter.emitRespEvent({
          api: 'xxx/updateUserInfo',
          resp: data，
          is_error
        });
      } 
  }`}
              language='jsx'
            />

            <div className="sub-title">
              4. 查看监控数据
            </div>
            <div className="content">
              接入SkyTower，配置好Emitter之后就可以做前端监控了。你可以登陆SkyTower前端监控数据中心的项目详情里查看客户端上报的数据。
              使用这些数据，你可以监控产品的基本使用情况，可以使用打点数据做用户行为分析等数据分析，还可以对用户的请求和响应数据做监控，实现单点追查。
              总之，利用打点数据，你可以做很多很多的事情。
            </div>

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
              📖 SkyTower 相关文档：<a href="https://github.com/secrettttt/sky-tower-doc">https://github.com/secrettttt/sky-tower-doc</a>
            </div>
            <div className="content">
              📱 SkyTower 前端： <a href="https://github.com/secrettttt/sky-tower-fe">https://github.com/secrettttt/sky-tower-fe</a>
            </div>
            <div className="content">
              💻 SkyTower 服务端：<a href="https://github.com/secrettttt/sky-tower-server">https://github.com/secrettttt/sky-tower-server</a>
            </div>
            <div className="content">
              📡 Emitter：<a href="https://github.com/secrettttt/sky-tower-jssdk">https://github.com/secrettttt/sky-tower-jssdk</a>
            </div>
          </Card>
        </div>
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
      </div>
    );
  }
}

export default HomePage;
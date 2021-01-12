import React, { Component }  from 'react';
import { PageHeader, Card, Image, Descriptions, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { eventStop } from '../../utils/eventStop';
import './index.less'; 

const { TextArea } = Input;

const gridStyle = {
  width: '100%',
  textAlign: 'center',
  marginBottom: 5,
  borderRadius: 15
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
    }
    this.modalValueObject = {};
  }

  showModal = (e) => {
    eventStop(e);
    this.setState({
      visible: true
    })
  };

  handleModalValueChange = (changeValue, allValue) => {
    if (!changeValue) {
      return;
    }
    this.modalValueObject = allValue;
  }

  handleOk = () => {
    console.log(this.modalValueObject);
    this.setState({
      confirmLoading: true
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      })
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    })
  };

  handleDetailButtonClick = (project_id) => {
    const { history } = this.props; 
    history.push({
      pathname: 'detail',
      search: '?project_id=789123', // 明文传参，URL上带参数
      query: {
        project_id: '789123' // Query对象传参，URL上不带参数
      }
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;

    return (
      <div className="profile-page">
        <Link to='/'><PageHeader
          className="profile-page-header"
          onBack={() => {}}
          title="我的"
          subTitle="SkyTower front-end monitoring data center"
        /></Link>
        <div className="profile-page-profile">
          <Card
              hoverable
              style={{ width: '100%', marginTop: 20 }}
            >
              <div className="header-info-card">
                <div className="header-info-card-image">
                  <Image
                    width={100}
                    height={100}
                    style={{margin: 10}}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    fallback="data:image/png;base64,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"
                  />
                </div>
                <div className="header-info-card-text">
                  <Card.Meta style={{ marginTop: 20, marginLeft: 20 }} title="我是个小前端" description="项目数: 6" />
                </div>
              </div>
            </Card>
            <Card style={{marginTop: 10, borderRadius: 15}}>
              <Card.Grid style={gridStyle}>
                <Descriptions
                  style={{textAlign: 'left'}} 
                  title="个人页面"
                  extra={<Button type="primary" onClick={(project_id) => this.handleDetailButtonClick(project_id)}>详情</Button>}
                >
                  <Descriptions.Item style={{width: '25%'}} label="项目id">623389</Descriptions.Item>
                  <Descriptions.Item style={{width: '45%'}} label="项目描述">这是一个react构建的前端项目，个人主页哈哈哈。</Descriptions.Item>
                  <Descriptions.Item style={{width: '30%'}} label="创建时间">2020年11月23日</Descriptions.Item>
                </Descriptions>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Descriptions
                  style={{textAlign: 'left'}} 
                  title="个人页面"
                  extra={<Button type="primary">详情</Button>}
                >
                  <Descriptions.Item style={{width: '25%'}} label="项目id">623389</Descriptions.Item>
                  <Descriptions.Item style={{width: '45%'}} label="项目描述">这是一个react构建的前端项目，个人主页哈哈哈。</Descriptions.Item>
                  <Descriptions.Item style={{width: '30%'}} label="创建时间">2020年11月23日</Descriptions.Item>
                </Descriptions>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Descriptions
                  style={{textAlign: 'left'}} 
                  title="个人页面"
                  extra={<Button type="primary">详情</Button>}
                >
                  <Descriptions.Item style={{width: '25%'}} label="项目id">623389</Descriptions.Item>
                  <Descriptions.Item style={{width: '45%'}} label="项目描述">这是一个react构建的前端项目，个人主页哈哈哈。</Descriptions.Item>
                  <Descriptions.Item style={{width: '30%'}} label="创建时间">2020年11月23日</Descriptions.Item>
                </Descriptions>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Descriptions
                  style={{textAlign: 'left'}} 
                  title="个人页面"
                  extra={<Button type="primary">详情</Button>}
                >
                  <Descriptions.Item style={{width: '25%'}} label="项目id">623389</Descriptions.Item>
                  <Descriptions.Item style={{width: '45%'}} label="项目描述">这是一个react构建的前端项目，个人主页哈哈哈。</Descriptions.Item>
                  <Descriptions.Item style={{width: '30%'}} label="创建时间">2020年11月23日</Descriptions.Item>
                </Descriptions>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Descriptions
                  style={{textAlign: 'left'}} 
                  title="个人页面"
                  extra={<Button type="primary">详情</Button>}
                >
                  <Descriptions.Item style={{width: '25%'}} label="项目id">623389</Descriptions.Item>
                  <Descriptions.Item style={{width: '45%'}} label="项目描述">这是一个react构建的前端项目，个人主页哈哈哈。</Descriptions.Item>
                  <Descriptions.Item style={{width: '30%'}} label="创建时间">2020年11月23日</Descriptions.Item>
                </Descriptions>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Descriptions
                  style={{textAlign: 'left'}} 
                  title="个人页面"
                  extra={<Button type="primary">详情</Button>}
                >
                  <Descriptions.Item style={{width: '25%'}} label="项目id">623389</Descriptions.Item>
                  <Descriptions.Item style={{width: '45%'}} label="项目描述">这是一个react构建的前端项目，个人主页哈哈哈。</Descriptions.Item>
                  <Descriptions.Item style={{width: '30%'}} label="创建时间">2020年11月23日</Descriptions.Item>
                </Descriptions>
              </Card.Grid>
            </Card>
        </div>
        <Button className="create-new-project-button" type="primary" onClick={this.showModal}>
          <PlusOutlined /> 创建一个新的项目
        </Button>
        <Modal
          title="创建一个新的项目"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          width={'60%'}
          okText={'创建新项目'}
          cancelText={'取消'}
          closable={false}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            size="large"
            colon={false}
            style={{marginTop: 20}}
            onValuesChange={this.handleModalValueChange}
          >
            <Form.Item
              label="项目名称"
              name="project_name"
              rules={[{ required: true, message: '给项目起个名字' }]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              label="线上地址"
              name="url_online"
              rules={[{ required: true, message: '给出项目的线上地址' }]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              label="项目描述"
              name="description"
              rules={[{ required: false }]}
            >
              <TextArea autoSize={{ minRows: 3, maxRows: 6 }} allowClear />
            </Form.Item>
          </Form>          
        </Modal>
      </div>
    );
  }
}

export default ProfilePage;


import React, { Component }  from 'react';
import { Form, Input, Button, Card, PageHeader, Select } from 'antd';
import { Link } from "react-router-dom";
import getQuery from '../../utils/getQuery.js';
import './index.less';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 15 },
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue="86" style={{ width: 80 }}>
      <Select.Option value="86">+86</Select.Option>
      <Select.Option value="87">+87</Select.Option>
    </Select>
  </Form.Item>
);

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.query = getQuery();
    console.log(this.query);
    this.state = {
    }
  }

  onUpdateFinish = values => {
    console.log('Success:', values);
  };

  onUpdateFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }; 

  onRegisterFinish = values => {
    console.log('Success:', values);
  };

  onRegisterFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }; 

  onLoginFinish = values => {
    const { onLoginSuccess } = this.props;
    console.log(this.props);
    console.log('Success:', values);
    if (values.username === 'hahaha' && values.password === '20201023') {
      alert('登陆成功');
      onLoginSuccess();
    } else {
      alert('密码或用户名错误');
    }
  };

  onLoginFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };  

  getPageHeaderTitle = (page_type) => {
    console.log(page_type);
    switch (page_type) {
      case 'login': return '登陆';
      case 'register': return '注册';
      case 'update': return '更新';
      default: return '注册登陆页';
    }
  }

  renderIsLogin = () => {
    const { onLoginFinish, onLoginFinishFailed } = this;
    const { username } = this.query;

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        size="large"
        colon={false}
        style={{marginTop: 20}}
        onFinish={onLoginFinish}
        onFinishFailed={onLoginFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input allowClear defaultValue={username} />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
    );
  }

  renderIsRegister = () => {
    const { onRegisterFinish, onRegisterFinishFailed } = this;

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        size="large"
        colon={false}
        style={{marginTop: 20}}
        onFinish={onRegisterFinish}
        onFinishFailed={onRegisterFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认您的密码！',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不一致！');
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: '请输入正确的邮箱地址' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号码"
          rules={[{ required: true, message: '请输入您的手机号码' }]}
        >
          <Input addonBefore={prefixSelector} allowClear style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }

  renderIsUpdate = () => {
    const { onUpdateFinish, onUpdateFinishFailed } = this;
    const { user_id } = this.query;

    return (
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          size="large"
          colon={false}
          style={{marginTop: 20}}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
        >
          <Form.Item
            label="用户ID"
            name="user_id"
            rules={[{ required: true }]}
          >
            <Input disabled allowClear defaultValue={user_id} />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password allowClear />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认您的密码！',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入的密码不一致！');
                },
              }),
            ]}
          >
            <Input.Password allowClear />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: '请输入正确的邮箱地址' }]}>
            <Input allowClear />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号码"
            rules={[{ required: true, message: '请输入您的手机号码' }]}
          >
            <Input addonBefore={prefixSelector} allowClear style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  render() {
    const { page_type } = this.query;

    let title = this.getPageHeaderTitle(page_type);

    return (
      <div className="login-page">
        <Link to='/profile'><PageHeader
          className="login-page-header"
          onBack={() => {}}
          title={title}
          subTitle="SkyTower front-end monitoring data center"
        /></Link>
        <Card
          hoverable
          style={{ width: '75%', marginTop: 20 }}
        >
          {
            page_type === 'login' && this.renderIsLogin()
          }
          {
            page_type === 'register' && this.renderIsRegister()
          }
          {
            page_type === 'update' && this.renderIsUpdate()
          }
        </Card>
      </div>
    );
  }
}

export default LoginPage;

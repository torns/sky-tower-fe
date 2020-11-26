import React, { Component }  from 'react';
import { Form, Input, Button, Card, PageHeader, Select } from 'antd';
import { Link } from "react-router-dom";
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

  getPageHeaderTitle = (isLogin, isRegister, isUpdate) => {
    if (isLogin) {
      return '登陆';
    } else if (isRegister) {
      return '注册';
    } else if (isUpdate) {
      return '修改个人信息';
    } else {
      return '注册登陆页';
    }
  }

  renderIsLogin = () => {
    const { onLoginFinish, onLoginFinishFailed } = this;

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
          <Input allowClear />
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

        <Form.Item
          label="命名空间"
          name="namespace"
          rules={[{ required: true, message: '请输入项目的命名空间' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
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
            <Input disabled allowClear defaultValue="9695888" />
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

          <Form.Item
            label="命名空间"
            name="namespace"
            rules={[{ required: true, message: '请输入项目的命名空间' }]}
          >
            <Input allowClear disabled />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
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
    const { isLogin = true, isRegister = false, isUpdate = false } = this.props;

    let title = this.getPageHeaderTitle(isLogin, isRegister, isUpdate);

    return (
      <div className="login-page">
        <Link to='/profile'><PageHeader
          className="login-page-header"
          onBack={() => {}}
          title={title}
          subTitle="Flight Aware Monitoring Platform"
        /></Link>
        <Card
          hoverable
          style={{ width: '75%', marginTop: 20 }}
        >
          {
            isLogin && this.renderIsLogin()
          }
          {
            isRegister && this.renderIsRegister()
          }
          {
            isUpdate && this.renderIsUpdate()
          }
        </Card>
      </div>
    );
  }
}

export default LoginPage;

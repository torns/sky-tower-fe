import React, { Component }  from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import './index.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onFinish = values => {
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

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };  

  render() {
    const { onFinish, onFinishFailed } = this;

    return (
      <div className="login-page">
        <div className="login-page-card">
          <Card title="登陆" extra={<div onClick={() => {alert('现在还注册不了，想要账号请找本人')}}>
            注册
          </div>} style={{ width: 300 }}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default LoginPage;

import React, { Component }  from 'react';
import { Form, Input, Button, Card, PageHeader, Select, message, Upload, Avatar } from 'antd';
import { Link } from "react-router-dom";
import getQuery from '../../utils/getQuery.js';
import reqwest from 'reqwest';
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
    this.state = {
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: decodeURIComponent(this.query.avatar),
        },
      ],
      avatar: decodeURIComponent(this.query.avatar),
    }
  }

  onUpdateFinish = values => {
    const { history } = this.props;
    const { avatar } = this.state;

    reqwest({
      url: `${window.requestUrl}/update/user_info`,
      method: 'post',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem("skyTowerUserId"),
        avatar,
        username: values.username,
        password: values.password,
        email: values.email,
        phone_number: values.phone,
      }
    }).then((res) => {
      const { err_no, err_message } = res;

      if (err_no === 0) {
        message.success('账号信息更新成功 😉');
    
        history.push('/');
      } else {
        message.error(err_message || '似乎有点问题...');
      }
    });
  };

  onUpdateFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error('似乎还有点问题 🌚');
  }; 

  onRegisterFinish = values => {
    const { history } = this.props;

    console.log('Success:', values);

    reqwest({
      url: `${window.requestUrl}/create/new_user`,
      method: 'post',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        username: values.username,
        password: values.password,
        email: values.email,
        phone_number: values.phone,
        user_create_time: Number(new Date())
      }
    }).then((res) => {
      const { err_no, err_message } = res;

      if (err_no === 0) {
        message.success('注册成功 😉');
    
        history.push('/');
      } else {
        message.error(err_message || '似乎有点问题...');
      }
    });
  };

  onRegisterFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error('似乎还有点问题 🌚');
  }; 

  onLoginFinish = values => {
    const { onLoginSuccess, history } = this.props;

    reqwest({
      url: `${window.requestUrl}/check_permission`,
      method: 'post',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        username: values.username,
        password: values.password,
        is_login_in: true
      }
    }).then((res) => {
      const { err_no, data } = res;
      
      if (err_no === 0) {
        // 登陆成功，前端保存服务端签发的token，记录用户的登陆状态
        localStorage.setItem('skyTowerToken', data.token);
        localStorage.setItem('skyTowerUserId', data.user_id);

        // 全局提示
        message.success('登陆成功 😚');

        // 跳转到项目列表页
        history.push({
          pathname: '/profile',
          search: `?user_id=${data.user_id}`
        });
      } else {
        // 登陆失败
        message.error('密码或用户名错误 🤕');
      }
    });
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

  uploadImage = async options => {
    const { file, onSuccess } = options;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", localStorage.getItem('skyTowerToken'));

    await reqwest({
      url: `${window.requestUrl}/image_upload`,
      method: 'post',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      processData: false, /* 必不可少 */
      data: formData
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        this.setState({
          avatar: data.url
        })
        onSuccess("Ok");
      } else {
        message.error(err_message || '似乎有点问题...');
      }
    });
  };

  onChange = ({ fileList: newFileList }) => {
    this.setState({
      fileList: newFileList
    });
  };

  onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  renderIsLogin = () => {
    const { onLoginFinish, onLoginFinishFailed } = this;
    const { username } = this.query;

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ username: username ? decodeURIComponent(username) : '' }}
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
          <Input.Password allowClear visibilityToggle={false} />
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
          <Input.Password allowClear visibilityToggle={false} />
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
          <Input.Password allowClear visibilityToggle={false} />
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
    const { fileList } = this.state;
    const { 
      user_id,
      username,
      email,
      phoneNumber,
    } = this.query;

    return (
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ user_id, username: decodeURIComponent(username), email, phone: phoneNumber }}
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
            label="用户头像"
            name="url"
            rules={[{ required: false }]}
          >
            <Upload
              data={{
                token: localStorage.getItem('skyTowerToken')
              }}
              customRequest={this.uploadImage}
              listType="picture-card"
              fileList={fileList}
              onChange={this.onChange}
              onPreview={this.onPreview}
            >
              {fileList.length === 0 && '+ Upload'}
            </Upload>
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input allowClear defaultValue={decodeURIComponent(username)} />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password allowClear visibilityToggle={false}/>
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
            <Input.Password allowClear visibilityToggle={false}/>
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: '请输入正确的邮箱地址' }]}>
            <Input allowClear defaultValue={email} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号码"
            rules={[{ required: true, message: '请输入您的手机号码' }]}
          >
            <Input addonBefore={prefixSelector} allowClear style={{ width: '100%' }}  defaultValue={phoneNumber}  />
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
        <Link to='/'><PageHeader
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

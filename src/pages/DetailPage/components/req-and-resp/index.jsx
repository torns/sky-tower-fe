import React from 'react';
import { Form, Input, Button, Select, Tag } from 'antd';
import './index.less';

const layout = {
    wrapperCol: {
        offset: 5,
        span: 10,
    },
    layout: 'horizontal'
};

const tailLayout = {
    wrapperCol: {
        offset: 9,
        span: 18,
    },
};

const successAndErrorOptions = [{
    label: 'is_error',
    value: 'gold'
},
{ 
    label: 'is_success',
    value: 'green'
}];

const reqAndRespOptions = [{
    label: 'req',
    value: 'lime'
},
{ 
    label: 'resp',
    value: 'cyan'
}];

class ReqAndResp extends React.Component {
  constructor () {
    super();
    this.state = {

    };
  }

  componentDidMount () {
    const { project_id } = this.props;
    console.log(project_id);
  }

  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  renderTag = (props) => {
    const { label, value, closable, onClose } = props;

    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  } 

  render() {

    return (
      <div className="req-and-resp">
        <div className="title">
          请求与响应过滤器
        </div>
        <div className="filter-container">
            <Form
                {...layout}
                name="basic"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item name="api">
                    <Input placeholder="接口地址 api" />
                </Form.Item>

                <Form.Item name="user_id">
                    <Input placeholder="用户id user_id" />
                </Form.Item>

                <Form.Item name="successAndError">
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={this.renderTag}
                        style={{ width: '100%' }}
                        options={successAndErrorOptions}
                        placeholder="成功、失败"
                    />
                </Form.Item>


                <Form.Item name="reqAndResp">
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={this.renderTag}
                        style={{ width: '100%' }}
                        options={reqAndRespOptions}
                        placeholder="请求、响应"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        过滤
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="list-container">

        </div>
      </div>
    );
  }
}

export default ReqAndResp;

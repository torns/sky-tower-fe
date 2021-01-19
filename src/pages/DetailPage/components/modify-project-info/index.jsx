import React from 'react';
import { Switch, Button, Form, Input } from 'antd';
import './index.less';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 17 },
};

class ModifyProjectInfo extends React.Component {
  constructor () {
    super();
    this.state = {
      disabled: true
    };
    // 表单初始值
    this.formValueObject = {
      description: "我的个人博客～",
      project_name: "个人博客主页",
      url_online: "www.demo.com"
    };
  }

  componentDidMount () {
    const { project_id } = this.props;
    console.log(project_id);
  }

  toggle = () => {
    const { disabled } = this.state;
    this.setState({
      disabled: !disabled
    })
  };

  handleFormValueChange = (changeValue, allValue) => {
    if (!changeValue) {
      return;
    }
    this.formValueObject = allValue;
  }

  handleClickButton = () => {
    console.log(this.formValueObject);
  }

  render() {
    const { disabled } = this.state;

    return (
      <div className="modify-project-info">
        <div className="title">
          修改项目信息
        </div>
        <div className="modify-switch-and-button">
          <div className="modify-switch">
            <span>解锁操作🔓： </span>
            <Switch defaultChecked={false} onClick={this.toggle} /> 
          </div>
          <div className="modify-form">
            {
              !disabled && <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                size="large"
                colon={false}
                style={{marginTop: 30}}
                onValuesChange={this.handleFormValueChange}
                initialValues={this.formValueObject}
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
            }
          </div>
          <div className={disabled ? "modify-button-disabled" : "modify-button"}>
            <Button 
                type="primary"
                disabled={disabled}
                style={{ width: '280px', height: '40px' }}
                onClick={this.handleClickButton}
              >
                保存修改
              </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModifyProjectInfo;

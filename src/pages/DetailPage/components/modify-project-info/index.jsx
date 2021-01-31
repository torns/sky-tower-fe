import React from 'react';
import { Switch, Button, Form, Input, message } from 'antd';
import getQuery from '../../../../utils/getQuery.js';
import reqwest from 'reqwest';
import './index.less';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 17 },
};

// 重新加载
function handleRetry (props) {
  if (props.handleReload && typeof props.handleReload === 'function') {
      props.handleReload();
  } else {
      window.location.reload();
  }
}

class ModifyProjectInfo extends React.Component {
  constructor () {
    super();
    this.state = {
      disabled: true,
      formValueObject: {}
    };
    this.query = getQuery();
  }

  componentDidMount () {
    reqwest({
      url: `${window.requestUrl}/get/project_detail`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        project_id: this.query.project_id,
        token: localStorage.getItem('skyTowerToken')
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        this.setState({
          formValueObject: {
            description: data.description,
            project_name: data.project_name,
            url_online: data.url_online
          }
        })
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
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
    this.setState({
      formValueObject: allValue
    });
  }

  handleClickButton = () => {  
    const { formValueObject } = this.state;
    reqwest({
      url: `${window.requestUrl}/update/project_info`,
      method: 'post',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        token: localStorage.getItem("skyTowerToken"),
        user_id: localStorage.getItem("skyTowerUserId"),
        project_id: this.query.project_id,
        ...formValueObject
      }
    }).then((res) => {
      const { err_no, err_message } = res;

      if (err_no === 0) {
        message.success('项目信息更新成功 🤪');
        window.setTimeout(() => {
          handleRetry(this.props);
        }, 100);
      } else {
        message.error(err_message || '似乎有点问题...');
      }
    });
  }

  render() {
    const { disabled, formValueObject } = this.state;

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
                initialValues={formValueObject}
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

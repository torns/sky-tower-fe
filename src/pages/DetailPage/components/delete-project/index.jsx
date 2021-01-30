import React from 'react';
import { Switch, Button, Popconfirm, Result, message } from 'antd';
import getQuery from '../../../../utils/getQuery.js';
import reqwest from 'reqwest';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './index.less';

class DeleteProject extends React.Component {
  constructor () {
    super();
    this.state = {
      disabled: true,
      is_monitoring: 1
    };
    this.query = getQuery();
  }

  componentDidMount () {
    reqwest({
      url: "http://101.200.197.197:8765/get/project_detail",
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
          is_monitoring: data.is_monitoring
        });
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

  confirmDelete = () => {
    reqwest({
      url: "http://101.200.197.197:8765/delete/project",
      method: 'post',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        token: localStorage.getItem("skyTowerToken"),
        user_id: 10088800 || localStorage.getItem("skyTowerUserId"),
        project_id: this.query.project_id,
      }
    }).then((res) => {
      const { err_no, err_message } = res;

      if (err_no === 0) {
        message.success('删除成功，项目已停止监控。➖');
        this.setState({
          is_monitoring: 0
        });
      } else {
        message.error(err_message || '似乎有点问题...');
      }
    });
  }

  cancelDelete = () => {
    console.log('cancelDelete');
  }

  render() {
    const { disabled, is_monitoring } = this.state;
    console.log(is_monitoring);

    return (
      <div className="delete-project">
        <div className="title">
          删除项目
        </div>
        {
          (Number(is_monitoring) === 1) ? (<div className="delete-switch-and-button">
              <div className="delete-switch">
                <span>解锁操作🔓： </span>
                <Switch defaultChecked={false} onClick={this.toggle} /> 
              </div>
              <div className="delete-button">
                <Popconfirm 
                  title="删除项目会把项目的所有信息以及所有上报的打点数据都删除，是否确认继续？" 
                  okText="确认删除"
                  cancelText="取消"
                  icon={
                    <QuestionCircleOutlined style={{ color: 'red' }} />
                  }
                  onCancel={this.cancelDelete}
                  onConfirm={this.confirmDelete}
                >
                  <Button 
                      type="primary"
                      disabled={disabled}
                      style={{ width: '280px', height: '40px' }}
                      danger 
                    >
                      删除项目
                    </Button>
                </Popconfirm>
              </div>
            </div>
          ) : (
            <div className="empty-result-container">
              <Result
                status="404"
                title="404"
                subTitle="项目已被删除，监控已停止。"
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default DeleteProject;

import React from 'react';
import { Switch, Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './index.less';

class DeleteProject extends React.Component {
  constructor () {
    super();
    this.state = {
      disabled: true
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

  confirmDelete = () => {
    console.log('confirmDelete');
  }

  cancelDelete = () => {
    console.log('cancelDelete');
  }

  render() {
    const { disabled } = this.state;

    return (
      <div className="delete-project">
        <div className="title">
          删除项目
        </div>
        <div className="delete-switch-and-button">
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
      </div>
    );
  }
}

export default DeleteProject;

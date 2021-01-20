import React from 'react';
import { Menu, Switch } from 'antd';
import { 
  HomeOutlined, 
  FundProjectionScreenOutlined, 
  BugOutlined, 
  SettingOutlined 
} from '@ant-design/icons';
import './index.less';

const { SubMenu } = Menu;

class Sider extends React.Component {
  state = {
    theme: 'dark',
    current: 'PvUvInfo',
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    const { handleActiveTabChange } = this.props;
    this.setState({
      current: e.key,
    });
    handleActiveTabChange(e.key);
  };

  render() {
    const { theme } = this.state;

    return (
      <div className={ theme === "light" ? "sider-container-light" : "sider-container" }>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['KeyResult']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="ProjectInfo" icon={<HomeOutlined />} title="项目信息">
            <Menu.Item key="ProjectDetailsInfo">项目详情信息</Menu.Item>
          </SubMenu>
          <SubMenu key="KeyResult" icon={<FundProjectionScreenOutlined />} title="关键指标">
            <Menu.Item key="PvUvInfo">pv、uv信息</Menu.Item>
            <Menu.Item key="SimultaneousOnlineInfo">同时在线信息</Menu.Item>
            <Menu.Item key="AllQueryConditions">所有查询条件</Menu.Item>
            <Menu.Item key="ActionEvent">用户行为事件</Menu.Item>
            <Menu.Item key="CountEvent">计数事件</Menu.Item>
            <Menu.Item key="ReqAndResp">请求和响应</Menu.Item>
          </SubMenu>
          <SubMenu key="ExceptionMonitoring" icon={<BugOutlined />} title="异常监控">
            <Menu.Item key="AjaxErrorRate">Ajax错误率</Menu.Item>
            <Menu.Item key="SinglePointTracing">单点追查</Menu.Item>
          </SubMenu>
          <SubMenu key="ProjectManagement" icon={<SettingOutlined />} title="项目管理">
            <Menu.Item key="ModifyProjectInfo">修改项目信息</Menu.Item>
            <Menu.Item key="DeleteProject">删除项目</Menu.Item>
          </SubMenu>
        </Menu>
        <div className="fixed-button">
          <Switch
            checked={this.state.theme === 'dark'}
            onChange={this.changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
      </div>
    );
  }
}

export default Sider;

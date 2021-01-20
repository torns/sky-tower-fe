import React, { Component }  from 'react';
import { Card, PageHeader, Dropdown} from 'antd';
import Sider from './components/sider';
import ProjectDetailsInfo from './components/project-details-info';
import SimultaneousOnlineInfo from './components/simultaneous-online-info';
import PvUvInfo from './components/pv-uv-info';
import AllQueryConditions from './components/all-query-conditions';
import CountEvent from './components/count-event';
import ModifyProjectInfo from './components/modify-project-info';
import DeleteProject from './components/delete-project';
import { DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import getQuery from '../../utils/getQuery.js';
import { menuOnPhone } from './const/const.jsx';
import './index.less';

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'PvUvInfo'
    }
    this.query = getQuery();
    this.isPhone =  document.body.clientWidth < 450 || document.documentElement.clientWidth < 450;
  }

  componentDidMount () {

  }

  handleActiveTabChange = (activeTab) => {
    this.setState({
      activeTab, 
    });
  }

  renderActiveTabContent = (activeTab) => {
    switch (activeTab) {
      case 'ProjectDetailsInfo': return <ProjectDetailsInfo />;
      case 'PvUvInfo': return <PvUvInfo project_id={this.query.project_id}/>;
      case 'SimultaneousOnlineInfo': return <SimultaneousOnlineInfo project_id={this.query.project_id}/>;
      case 'AllQueryConditions': return <AllQueryConditions project_id={this.query.project_id}/>;
      case 'DeleteProject': return <DeleteProject project_id={this.query.project_id}/>;
      case 'ModifyProjectInfo': return <ModifyProjectInfo project_id={this.query.project_id}/>;
      case 'CountEvent': return <CountEvent project_id={this.query.project_id}/>
      default: return null;
    }
  }

  render() {
    const { isPhone } = this;
    const { activeTab } = this.state;

    return (
      <div className="detail-page">
        <Link to='/profile'><PageHeader
          className="detail-page-header"
          onBack={() => {}}
          title={'项目详情页'}
          subTitle="SkyTower front-end monitoring data center"
        /></Link>
        <Card
          hoverable
          style={{ width: '95%', marginTop: 20, marginBottom: 56 }}
        >
          { !isPhone && <Sider handleActiveTabChange={this.handleActiveTabChange} /> }
          { isPhone && <Dropdown overlay={menuOnPhone}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
               { `导航  `} <DownOutlined />
            </a>
          </Dropdown> }
          <div className="active-tab-content">
            {
              this.renderActiveTabContent(activeTab)
            }
          </div>
        </Card>
      </div>
    );
  }
}

export default DetailPage;

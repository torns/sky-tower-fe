import React from 'react';
import { Statistic, Row, Col, DatePicker, Space, Table, Radio, message } from 'antd';
import PvUvChart from '../pv-uv-chart';
import getQuery from '../../../../utils/getQuery';
import reqwest from 'reqwest';
import './index.less';

const { RangePicker } = DatePicker;

const pvUvInfoByTimeColumns = [
  {
    title: '项目访问量',
    dataIndex: 'pv',
    key: 'pv',
    width: '500px',
    align: 'center',
  },
  {
    title: '用户量',
    dataIndex: 'uv',
    key: 'uv',
    width: '500px',
    align: 'center'
  }
];

class PvUvInfo extends React.Component {
  constructor () {
    super();
    this.state = {
      all_pv: 0,
      all_uv: 0,
      pvUvChart: [],
      pvUvByTime: {}
    };
    this.query = getQuery();
  }

  componentDidMount () {
    this.getPvUvInfo();
  }

  handleDatePickerChange = (moment, dateString) => {
    reqwest({
      url: `${window.requestUrl}/get/by_time/pv_uv`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem('skyTowerUserId'),
        project_id: this.query.project_id,
        start_time: Array.isArray(moment) && Number(moment[0]),
        end_time: Array.isArray(moment) && Number(moment[1]),
        token: localStorage.getItem('skyTowerToken')
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      const { pv = 0, uv = 0 } = data;
      if (err_no === 0) {
        this.setState({
          pvUvByTime: {
            pv,
            uv
          }
        });
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
  }

  handleRadioChange = (e, v) => {
    this.getPvUvInfo({
      type: e.target.value
    })
  }

  getPvUvInfo = (obj = {}) => {
    reqwest({
      url: `${window.requestUrl}/get/info/pv_uv`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem('skyTowerUserId'),
        project_id: this.query.project_id,
        type: obj.type || 'last week',
        token: localStorage.getItem('skyTowerToken')
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      const { all_pv, all_uv } = data;
      if (err_no === 0) {
        this.setState({
          all_pv,
          all_uv,
          pvUvChart: data.data
        })
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
  }

  render() {
    const { all_pv, all_uv, pvUvChart, pvUvByTime } = this.state;

    const pvUvInfoByTimeData = [
      {
        key: '0',
        name: 'pvUvInfoByTime',
        pv: pvUvByTime.pv,
        uv: pvUvByTime.uv
      }
    ];

    return (
      <div className="pv-uv-info">
        <div className="title">
          项目总访问量、项目总用户量
        </div>
        <div className="all-pv-uv-info">
          <Row gutter={24}>
            <Col span={50}>
              <Statistic title="Page View (pv)" value={all_pv} />
            </Col>
            <Col span={50}>
              <Statistic title="Unique visitor (uv)" value={all_uv} />
            </Col>
          </Row>
        </div>
        <div className="title">
          项目近期的 pv、uv 曲线
        </div>
        <div className="pv-uv-chart">
          <Radio.Group defaultValue="last week" buttonStyle="solid" onChange={this.handleRadioChange}>
            <Radio.Button style={{ marginRight: 10}} value="last six month">最近六个月</Radio.Button>
            <Radio.Button style={{ marginRight: 10}} value="last month">最近一个月</Radio.Button>
            <Radio.Button style={{ marginRight: 10}} value="last week">最近一个星期</Radio.Button>
            <Radio.Button style={{ marginRight: 10}} value="last day">最近一天</Radio.Button>
          </Radio.Group>
          <PvUvChart data={pvUvChart} />
        </div>
        <div className="title">
          某时间段内pv、uv查询
        </div>
        <div className="pv-uv-date-picker">
          <Space direction="vertical" size={12}>
            <RangePicker showTime onChange={this.handleDatePickerChange}/>
          </Space>
        </div>
        <div className="pv-uv-table">
          <Table columns={pvUvInfoByTimeColumns} dataSource={pvUvInfoByTimeData} pagination={false} />
        </div>
      </div>
    );
  }
}

export default PvUvInfo;

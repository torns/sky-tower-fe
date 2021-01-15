import React from 'react';
import { Statistic, Row, Col, DatePicker, Space, Table } from 'antd';
import './index.less';

const { RangePicker } = DatePicker;

const data = [
  {
    key: '0',
    name: 'pvUvInfoByTime',
    pv: 123233,
    uv: 32636
  }
];

const columns = [
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

    };
  }

  componentDidMount () {
    const { project_id } = this.props;
    console.log(project_id);
  }

  handleDatePickerChange = (moment, dateString) => {
    console.log(Number(moment[0]), dateString[0]);
    console.log(Number(moment[1]), dateString[1]);
  }

  render() {

    return (
      <div className="pv-uv-info">
        <div className="title">
          项目总访问量、项目总用户量
        </div>
        <div className="all-pv-uv-info">
          <Row gutter={24}>
            <Col span={50}>
              <Statistic title="Page View (pv)" value={1128923000} />
            </Col>
            <Col span={50}>
              <Statistic title="Unique visitor (uv)" value={667858323232} />
            </Col>
          </Row>
        </div>
        <div className="title">
          项目近期的 pv、uv 曲线
        </div>
        <div>
        </div>
        <div className="title">
          某时间段内pv、uv查询
        </div>
        <div className="pv-uv-table">
          <Space direction="vertical" size={12}>
            <RangePicker showTime onChange={this.handleDatePickerChange}/>
          </Space>
        </div>
        <div>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    );
  }
}

export default PvUvInfo;

import React from 'react';
import { DatePicker, Space, message } from 'antd';
import {
  Chart,
  Point,
  Line,
	Axis,
  Area,
  Tooltip,
  Coordinate
} from 'bizcharts';
import DataSet from '@antv/data-set';
import getQuery from '../../../../utils/getQuery';
import reqwest from 'reqwest';
import './index.less';

const { RangePicker } = DatePicker;


class AjaxErrorRate extends React.Component {
  constructor () {
    super();
    this.state = {
      data: []
    };
    this.query = getQuery();
  }

  componentDidMount () {
    this.getAjaxErrorRate({});
  }

  getAjaxErrorRate = (obj) => {
    reqwest({
      url: `${window.requestUrl}/get/rate/ajax_error`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem("skyTowerUserId"),
        project_id: this.query.project_id,
        start_time: obj.start_time || 0,
        end_time: obj.end_time || 0,
        token: localStorage.getItem("skyTowerToken")
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        message.success('数据获取成功～ 😉');
        this.setState({
          data: data.data
        })
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
  }

  handleDatePickerChange = (moment, dateString) => {
    const isArray = Array.isArray(moment);
    
    this.getAjaxErrorRate({
      start_time: isArray && Number(moment[0]),
      end_time: isArray && Number(moment[1])
    });
  }

  getListData = (originalData) => {
    let data = [];

    if (Array.isArray(originalData)) {
      originalData.map((event, index) => {
        const temp = {
          item: Object.keys(event)[0],
          'Ajax请求成功率': ((1 - Object.values(event)[0].ajax_error_rate) * 100),
          'Ajax错误率': ((Object.values(event)[0].ajax_error_rate) * 100)
        }
        data.push(temp);
      });
    }
    return data;
  }

  render() {
    const { data: respData } = this.state;

    const data = this.getListData(respData);

    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Ajax请求成功率', 'Ajax错误率'], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    });

    return (
      <div className="ajax-error-rate">
        <div className="title">
          Ajax错误率
        </div>
        <div className="date-picker">
          <Space direction="vertical" size={12}>
            <RangePicker showTime onChange={this.handleDatePickerChange}/>
          </Space>
        </div>
        <div className="result-container">
          <Chart
            height={500}
            data={dv.rows}
            autoFit
            scale={{
              score:{
                min: 0,
                max: 100,
              }
            }}
            interactions={['legend-highlight']}
          >
            <Coordinate type="polar" radius={0.8} />
            <Tooltip shared />
            <Point
              position="item*score"
              color="user"
              shape="circle"
            />
            <Line
              position="item*score"
              color="user"
              size="2"
            />
            <Area
              position="item*score"
              color="user"
            />
            {
              // 棱角和圆形，默认圆形
            }
            <Axis name="score" grid={{ line: {type: 'line'}}} />
            {
              // 不需要轴的最外圈
            }
            <Axis name="item" line={false} />
          </Chart> 
        </div>
      </div>
    );
  }
}

export default AjaxErrorRate;

import React from 'react';
import { DatePicker, Space } from 'antd';
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
import './index.less';

const { RangePicker } = DatePicker;


class AjaxErrorRate extends React.Component {
  constructor () {
    super();
    this.state = {

    };
  }

  handleDatePickerChange = (moment, dateString) => {
    console.log(Number(moment[0]), dateString[0]);
    console.log(Number(moment[1]), dateString[1]);
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
    const mockData = [
      {
          "xxx/getUserInfo": {
              "success_count": "870",
              "error_count": "130",
              "ajax_error_rate": "0.13",
          },
      },
      {
           "xxx/getProjectInfo": {
              "success_count": "800",
              "error_count": "200",
              "ajax_error_rate": "0.20",
          }
      },
      {
        "xxx/getUserList": {
            "success_count": "870",
            "error_count": "130",
            "ajax_error_rate": "0.13",
        },
      },
      {
          "xxx/getProjectList": {
              "success_count": "800",
              "error_count": "200",
              "ajax_error_rate": "0.20",
          }
      },
      {
        "xxx/postFeedback": {
            "success_count": "870",
            "error_count": "130",
            "ajax_error_rate": "0.25",
        },
      },
      {
          "xxx/postAnswer": {
              "success_count": "800",
              "error_count": "200",
              "ajax_error_rate": "0.30",
          }
      }
  ];

  const data = this.getListData(mockData);

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

import React from 'react';
import { DatePicker, Space, Progress } from 'antd';
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

  render() {
    const pc = 100;

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
        <div>
          {
              pc === 100 && <Progress type="circle" percent={100} />
          }
          {
              pc === 0 &&  <Progress type="circle" percent={70} status="exception"/>
          }
        {/* <Progress type="circle" percent={75} />
        <Progress type="circle" percent={70}/>
        <Progress type="circle" percent={100} /> */}
        </div>
      </div>
    );
  }
}

export default AjaxErrorRate;

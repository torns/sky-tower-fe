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
    const pc = 87;

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
        <div className="progress-container">
          {
              pc === 100 && <Progress type="circle" percent={100} />
          }
          {
              pc === 0 && <Progress type="circle" percent={100} status="exception" />
          }
          {
              (pc !== 100 && pc !== 0) && (<div>
                <Progress type="circle" percent={pc} style={{ margin: 36 }} />
                <Progress type="circle" percent={100-pc} style={{ margin: 36 }} strokeColor="#ff4d4f" />
              </div>)
          }
        </div>
        <div className="result-text">
          {
            pc === 100 && <div style={{ color: '#52c41a' }}>Ajax 错误率为 0 🎉</div>
          }
          {
            pc === 0 && <div style={{ color: '#cf1322' }}>Ajax错误率为100%，您的服务已告警 ❌</div>
          }
          {
            (pc < 100 && pc >= 70) && <div style={{ color: '#1890ff' }}>{`Ajax错误率为${100-pc}%`}</div>
          }
          {
            (pc < 70 && pc > 0) && <div style={{ color: '#faad14' }}>{`Ajax错误率为${100-pc}%，您的服务已告警！`}</div>
          }
        </div>
      </div>
    );
  }
}

export default AjaxErrorRate;

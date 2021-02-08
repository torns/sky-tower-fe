import React from 'react';
import { Input, Space, DatePicker, Checkbox, message, BackTop, Alert, Tag } from 'antd';
import ReactJson from 'react-json-view';
import getQuery from '../../../../utils/getQuery';
import reqwest from 'reqwest';
import './index.less';

const { Search } = Input;
const { RangePicker } = DatePicker;

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 24,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 5,
};

// 日期格式化
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "H+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

class SinglePointTracing extends React.Component {
  constructor () {
    super();
    this.state = {
      isOnlyGetHttpInfo: false,
      time: {},
      data: []
    };
    this.query = getQuery();
  }

  componentDidMount () {
    this.onSearch();
  }

  onSearch = value => {
    const { isOnlyGetHttpInfo, time } = this.state;

    reqwest({
      url: isOnlyGetHttpInfo ? `${window.requestUrl}/get/list/http_event` :
      `${window.requestUrl}/get/list/user_all_type_event`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem('skyTowerUserId'),
        token: localStorage.getItem('skyTowerToken'),
        project_id: this.query.project_id,
        uid: value,
        start_time: time.start_time || Number(new Date().getTime()) - 1000*60*60*24, // 不填就默认前一天
        end_time:  time.end_time || Number(new Date().getTime()),
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        message.success('数据获取成功～ 😚');
        this.setState({
          data: data.data || []
        })
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
  }

  handleDatePickerChange = (moment, dateString) => {
    const isArray = Array.isArray(moment);
    
    this.setState({
      time: {
        start_time: isArray && Number(moment[0]),
        end_time: isArray && Number(moment[1])
      }
    });
  }

  onCheckBoxChange = (e) => {
    this.setState({
      isOnlyGetHttpInfo: e.target.checked
    });
  }

  render() {
    const { isOnlyGetHttpInfo, data } = this.state;

    return (
      <div className="single-point-tracing">
        <div className="title">
          根据给定 user_id 追查问题
        </div>
        <div className="search-container">
          <Search placeholder="请输入 user_id 追查问题" allowClear onSearch={this.onSearch} style={{ width: 390 }} enterButton />
          <div className="search-filter">
            <Space direction="vertical" size={12}>
              <RangePicker showTime onChange={this.handleDatePickerChange} disabled={isOnlyGetHttpInfo}/>
            </Space>
            {
              isOnlyGetHttpInfo && <div className="warning-tag"><Tag color="red">网络请求目前暂不支持按时间检索 😔</Tag></div>
            }
            <div className="checkbox">
              <Checkbox defaultChecked={isOnlyGetHttpInfo} onChange={this.onCheckBoxChange} />
              <div className="checkbox-label">仅查询网络请求</div>
            </div>
          </div>
        </div>
        <div className="title">
          日志查询结果
        </div>
        <div className="search-response">
          {
            Array.isArray(data) && data.map((value, index) => {
              return (
                <div className="react-json-container" key={index}>
                  <div className="react-json-info">
                  {
                    value.type === 'resp' ? value.is_success ? 
                      <Alert 
                        message={`${value.type} ${new Date(Number(value.time)).Format("yyyy-MM-dd HH:mm:ss")}`} 
                        type="success" 
                        showIcon 
                      /> : 
                      <Alert 
                        message={`${value.type} ${new Date(Number(value.time)).Format("yyyy-MM-dd HH:mm:ss")}`} 
                        type="error" 
                        showIcon 
                      />
                    :  <Alert 
                        message={`${value.type} ${new Date(Number(value.time)).Format("yyyy-MM-dd HH:mm:ss")}`} 
                        type="info" 
                        showIcon 
                      />

                  }
                  </div>
                  <div className="react-json">
                    <ReactJson src={value} />
                  </div>
                </div>
              );
            })
          }
        </div>
        <BackTop>
          <div style={style}>回到顶部</div>
        </BackTop>
      </div>
    );
  }
}

export default SinglePointTracing;

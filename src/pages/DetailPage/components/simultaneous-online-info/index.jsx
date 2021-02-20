import React from 'react';
import { Result, Button, message } from 'antd';
import getQuery from '../../../../utils/getQuery';
import reqwest from 'reqwest';
import './index.less';

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

// // 重新加载
// function handleRetry (props) {
//   if (props.handleReload && typeof props.handleReload === 'function') {
//       props.handleReload();
//   } else {
//       window.location.reload();
//   }
// }

class SimultaneousOnlineInfo extends React.Component {
  constructor () {
    super();
    this.state = {
      simultaneousOnlineCount: 0,
      currentTime: new Date().Format("yyyy-MM-dd HH:mm:ss")
    };
    this.query = getQuery();
  }

  componentDidMount () {
    this.getSimultaneousOnline();
  }

  handleClickJumpButton = () => {
    window.location.href = 'https://www.baidu.com';
  }

  handleRefresh = () => {
    this.setState({
      currentTime: new Date().Format("yyyy-MM-dd HH:mm:ss")
    });
    this.getSimultaneousOnline();
  }

  getSimultaneousOnline = () => {
    reqwest({
      url: `${window.requestUrl}/get/simultaneous_online/pv_uv`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem('skyTowerUserId'),
        project_id: this.query.project_id,
        token: localStorage.getItem('skyTowerToken')
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        this.setState({
          simultaneousOnlineCount: data.pv
        });
        message.success('数据获取成功～ 😚');
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
  }

  render() {
    const { currentTime, simultaneousOnlineCount } = this.state;

    return (
      <div className="simultaneous-online-info">
        <div className="title">
          同时在线信息
        </div>
        <div className="result">
          <Result
            style={{ widows: '100%'}}
            status="success"
            title={`当前在线人数为：${simultaneousOnlineCount}`}
            subTitle={`获取当前在线人数成功，当前时间为: ${currentTime} `}
            extra={[
              <Button type="primary" onClick={this.handleClickJumpButton}>
                进入该项目
              </Button>,
              // <Button onClick={() => handleRetry(this.props)}>刷新</Button>,
              <Button onClick={this.handleRefresh}>刷新</Button>,
            ]}
          />
        </div>
      </div>
    );
  }
}

export default SimultaneousOnlineInfo;

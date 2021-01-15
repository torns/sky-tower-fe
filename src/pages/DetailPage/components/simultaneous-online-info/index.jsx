import React from 'react';
import { Result, Button } from 'antd';
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
      currentTime: new Date().Format("yyyy-MM-dd HH:mm:ss")
    };
  }

  componentDidMount () {
    const { project_id } = this.props;
    console.log(project_id);
  }

  handleClickJumpButton = () => {
    window.location.href = 'https://www.baidu.com';
  }

  handleRefresh = () => {
    this.setState({
      currentTime: new Date().Format("yyyy-MM-dd HH:mm:ss")
    })
  }

  render() {
    const { currentTime } = this.state;
    const simultaneousOnlineCount = 127;

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

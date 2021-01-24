import React from 'react';
import { Descriptions, Image, Tag } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
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

class ProjectDetailsInfo extends React.Component {
  constructor () {
    super();
    this.state = {

    };
  }
  // is_has_pv_uv
  // boolean
  // 是否已经有pv、uv数据上报
  // is_has_action_event
  // boolean
  // 是否已经有actionEvent上报
  // is_has_count_event
  // boolean
  // 是否已经有countEvent上报
  // is_has_http_event
  // boolean
  // 是否已经有httpEvent上报
  // is_good_project
  // boolean
  // 是否是优质项目
  // is_hot_project
  // boolean
  // 是否为热榜项目
  

  render() {
    const data =  {
      "project_id": "781234",
      "project_name": "sky-tower-前端项目",
      "description": "这是一个前端监控平台，还在开发中～",
      "url_online": "http://101.200.197.197",
      "create_time": 1607931956360,
      "user_id": "12783456",
      "username": "skytower测试账号",
      "avatar": "https://qqpublic.qpic.cn/qq_public/0/0-2953961974-E787620561BA09D1A41FFA817D6D9AE1/900?fmt=jpg&size=15&h=400&w=400&ppv=1",
      "user_create_time": 1607831956360,
      "is_has_pv_uv": true,
      "is_has_action_event": true,
      "is_has_count_event": false,
      "is_has_http_event": true,
      "is_good_project": false,
      "is_hot_event": true,
  };

   const isMonitoring = true;

    return (
      <div className="project-detail-info">
        <div className="descriptions-container">
          <div className="title">
            项目详情信息
          </div>
          <Descriptions column={3}>
            <Descriptions.Item label="项目id 💎">{data.project_id}</Descriptions.Item>
            <Descriptions.Item label="项目名称 🔖">{data.project_name}</Descriptions.Item>
            <Descriptions.Item label="项目创建时间 ⌛️">{new Date(data.create_time).Format("yyyy-MM-dd HH:mm:ss")}</Descriptions.Item>
          </Descriptions>
          <Descriptions column={1}>
            <Descriptions.Item label="线上地址 📡"><a href={data.url_online}>{data.url_online}</a></Descriptions.Item>
          </Descriptions>
          <Descriptions column={1}>
            <Descriptions.Item label="项目描述 🎞">{data.description}</Descriptions.Item>
          </Descriptions>
          <div className="title">
            项目创建者信息
          </div>
          <div className="user-info-container">
            <div className="avatar-container">
              <Image
                width={100}
                height={100}
                src={data.avatar}
                fallback="data:image/png;base64,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"
              />
            </div>
            <div className="info-container">
              <Descriptions column={1}>
                <Descriptions.Item label="用户id ⛱">{data.user_id}</Descriptions.Item>
                <Descriptions.Item label="用户名 🧸">{data.username}</Descriptions.Item>
                <Descriptions.Item label="加入SkyTower时间 🎈">{new Date(data.user_create_time).Format("yyyy-MM-dd HH:mm:ss")}</Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </div>
        <div className="tag-container">
          <div className="title">
            数据监控详情
          </div>
          <div className="monitor-status">
            {
              isMonitoring ? (<Tag icon={<SyncOutlined spin />} color="processing">
                监控进行中...
              </Tag>) : (<Tag icon={<ExclamationCircleOutlined />} color="error">
                  已停止监控
                </Tag>
              )
            }
          </div>
          {
            isMonitoring && (<div className="data-status">
                <Tag 
                  icon={ data.is_has_pv_uv ? <CheckCircleOutlined /> : <ClockCircleOutlined /> } 
                  color={ data.is_has_pv_uv ? 'success' : 'default'} >
                  { 
                    data.is_has_pv_uv ? 'pv、uv已上报' : 'pv、uv未上报'
                  }
                </Tag>
                <Tag 
                  icon={ data.is_has_action_event ? <CheckCircleOutlined /> : <ClockCircleOutlined /> } 
                  color={ data.is_has_action_event ? 'success' : 'default'} >
                  { 
                    data.is_has_action_event ? '用户行为actionEvent已上报' : '未发现有用户行为actionEvent上报'
                  }
                </Tag>
                <Tag 
                  icon={ data.is_has_count_event ? <CheckCircleOutlined /> : <ClockCircleOutlined /> } 
                  color={ data.is_has_count_event ? 'success' : 'default'} >
                  { 
                    data.is_has_count_event ? '计数事件countEvent已上报' : '未发现有计数事件countEvent上报'
                  }
                </Tag>
                <Tag 
                  icon={ data.is_has_http_event ? <CheckCircleOutlined /> : <ClockCircleOutlined /> } 
                  color={ data.is_has_http_event ? 'success' : 'default'} >
                  { 
                    data.is_has_http_event ? '网络请求事件已上报' : '未抓到网络请求事件'
                  }
                </Tag>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default ProjectDetailsInfo;

import React from 'react';
import skyTowerForPM from '../image/skytowerForPM.png';
import skyTowerForRD from '../image/skytowerForRD.png';
import skyTowerForDA from '../image/skytowerForDA.png';
import airportTower from '../image/airportTower.jpg';
import skyTowerFlow from '../image/skytowerflow.png';

export const columns = [
  {
    title: '字段名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '含义',
    dataIndex: 'mean',
    key: 'mean',
  },
  {
    title: '枚举值/如何获取',
    dataIndex: 'howToGet',
    key: 'howToGet',
  }
];
  
export const initData = [
  {
    name: 'pid',
    type: 'string',
    mean: '项目id/页面id',
    howToGet: 'SkyTower监控平台上创建项目后得到的project_id',
  },
  {
    name: 'uid',
    type: 'string',
    mean: '区分不同的用户，用户统计uv，追查问题',
    howToGet: '用户自定义',
  },
];
  
  
export const emitActionEventData = [
  {
    name: 'event',
    type: 'string',
    mean: '事件名称',
    howToGet: 'click_bottom_button',
  },
  {
    name: 'location',
    type: 'string',
    mean: '地理位置',
    howToGet: '北京市海淀区',
  },
  {
    name: 'device_brand',
    type: 'string',
    mean: '机型',
    howToGet: 'XIAO MI',
  },
  {
    name: 'app_version',
    type: 'string',
    mean: '页面版本号',
    howToGet: '8.2.5',
  },
  {
    name: 'system_version',
    type: 'string',
    mean: '系统版本号',
    howToGet: '9.2.0',
  },
  {
    name: 'client',
    type: 'string',
    mean: '客户端类型',
    howToGet: 'Android',
  },
  {
    name: 'net_type',
    type: 'string',
    mean: '网络类型',
    howToGet: '4G',
  },
  {
    name: 'ip_address',
    type: 'string',
    mean: 'ip地址',
    howToGet: '10.157.168.235',
  },
  {
    name: 'extra',
    type: 'object',
    mean: '自定义参数',
    howToGet: `{ env: 'dev' }`,
  },
];
  
export const emitCountEventData = [
  {
    name: 'event',
    type: 'string',
    mean: '事件名称',
    howToGet: 'click_bottom_button',
  },
];
  
export const emitReqEventData = [
  {
    name: 'api',
    type: 'string',
    mean: '接口地址',
    howToGet: 'xxx/getUserInfo',
  },
  {
    name: 'query',
    type: 'string',
    mean: 'get请求参数',
    howToGet: 'user_id=987234&&user_name=secretttt&&user_type=vip',
  },
  {
    name: 'request_body',
    type: 'string',
    mean: 'post请求参数',
    howToGet: '{"user_id": "987234", "user_name": "secretttt", "user_type": "vip"}',
  },
];
  
export const emitRespEventData = [
  {
    name: 'is_success',
    type: 'boolean',
    mean: '成功',
    howToGet: '默认值false',
  },
  {
    name: 'is_error',
    type: 'boolean',
    mean: '失败',
    howToGet: '默认值false',
  },
  {
    name: 'api',
    type: 'string',
    mean: '接口地址',
    howToGet: 'xxx/getUserInfo',
  },
  {
    name: 'resp',
    type: 'object',
    mean: '返回参数',
    howToGet: `{ err_no: 0, err_msg: 'success'}`,
  },
];

export const initCode = `  import { init } from 'skytower';

  // init方法一般在constructor或者componentDidMount里调用
  init({
      pid: '987456',
      uid: this.state.user_id
  });`;

export const emitActionEventCode = `  import { emitter } from 'skytower';

  // 这些参数不是必传的
  emitter.emitActionEvent({
      event: 'click_bottom_button',
      location: '北京市海淀区',
      device_brand: 'XIAO MI',
      app_version: '8.2.5',
      system_version: '9.2.0',
      client: 'Android',
      net_type: '4G',
      ip_address: '10.157.168.235',
      extra: {
          env: 'dev'
      }    
  });`;

export const emitCountEventCode = `  import { emitter } from 'skytower';

  emitter.emitCountEvent('image_upload');`;

export const emitReqEventCode = `  import { emitter } from 'skytower';

  emitter.emitReqEvent({
      api: 'xxx/getUserInfo',
      query: 'user_id=987234&&user_name=secretttt&&user_type=vip'
  });

  emitter.emitReqEvent({
      api: 'xxx/updateUserInfo',
      request_body: '{"user_id": "987234", "user_name": "secretttt", "user_type": "vip"}'
  });`;

export const emitRespEventCode = `  import { emitter } from 'skytower';

  const getUserInfo = async () => {
      const { user_id } = this.state;
      const { status, data = {} } = await getUserInfo(user_id);
      
      if (status === 0) {
        // 请求成功上报
        emitter.emitRespEvent({
          api: 'xxx/updateUserInfo',
          resp: data，
          is_success
        });
      } else {
        // 请求失败上报
        emitter.emitRespEvent({
          api: 'xxx/updateUserInfo',
          resp: data，
          is_error
        });
      } 
  }`;


export const ourLink = {
  doc: 'https://github.com/secrettttt/sky-tower-doc',
  front_end: 'https://github.com/secrettttt/sky-tower-fe',
  server: 'https://github.com/secrettttt/sky-tower-server',
  emitter: 'https://github.com/secrettttt/sky-tower-jssdk'
}

export const posterQuestion = 'web网站、移动端h5监控？';
export const posterAnswer = '接入SkyTower。';
export const posterDetail = `一个PC端web网站或者移动端h5页面开发完成，在用户实际使用的过程中，
由于实际设备、网络状态、使用方式等因素，可能会出现各种各样的问题。这些问题往往具有难以察觉、难以复现的特点，
如果不能得到解决，会大大降低用户体验。基于这样的背景，SkyTower提供了一整套的解决方案。使用SkyTower，
你只需要根据你项目中标识唯一用户的参数去追查用户的网络请求，难以复现的问题不至于没有任何头绪。
你还可以使用SkyTower来给你的项目加打点，跟踪用户的使用情况，指导项目的优化...`;

export const skyTowerFor = [
  {
    src: skyTowerForPM,
    title: "SkyTower For PM",
    description: "接入SkyTower，产品能够看到用户真实的使用情况数据，更能够站在用户的角度看问题，指导产品的更新迭代。"
  },
  {
    src: skyTowerForRD,
    title: "SkyTower For RD",
    description: "接接入SkyTower，研发能够快速追查线上问题、接收到监控报警，线上bug尽快修复，提升用户体验。"
  },
  {
    src: skyTowerForDA,
    title: "SkyTower For DA",
    description: "接入SkyTower，数据分析师能够拿到真实的用户行为数据，做更多有意义的事。" 
  }
];

export const whySkyTower = [
  {
    src: airportTower,
    title: "AirportTower 全链路流程" ,
    description: `AirportTower是机场塔台，或称控制塔，是一种设置于机场中的航空运输管制设施，
用来监看以及控制飞机起降的地方。机场塔台里可以监测到当日进出港机组排班情况，延误正点、航班号、
计划起飞时间、目的地、机型、停机位、离场信息、应答机号等信息。一般这些信息会在机组起飞或者准备降落时获得。
这和我们的网络请求是一样的，当页面向服务端发起请求或者接受响应时，我们如果能够将此次请求相关的参数上报给
一个类似“AirportTower”的监控平台，那么我们就可以在这个平台上看到各种各样的监控数据。`
  },
  {
    src: skyTowerFlow,
    title: "SkyTower 全链路流程" ,
    description: `SkyTower就是借鉴了这个思想，接入SkyTower的前端项目，在项目中部署Emitter，当对应的事件被触发，
Emitter就会向SkyTower发射信号。在SkyTower上就能够实时地监测到此次事件。`
  }
];


export const emitterInfo = [
  {
    titleContent: '👉 emitter.emitActionEvent 上报用户行为事件',
    dataSource: emitActionEventData,
    code: emitActionEventCode,
  },
  {
    titleContent: '👉 emitter.emitCountEvent 上报计数事件',
    dataSource: emitCountEventData,
    code: emitCountEventCode,
  },
  {
    titleContent: '👉 emitter.emitReqEvent 上报请求事件',
    dataSource: emitReqEventData,
    code: emitReqEventCode,
  },
  {
    titleContent: '👉 emitter.emitRespEvent 上报响应事件',
    dataSource: emitRespEventData,
    code: emitRespEventCode,
  },
];

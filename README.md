# SkyTower监控平台前端代码仓库
&#160; &#160; &#160; &#160;SkyTower是一个监控数据可视化平台，是整个项目的核心。对于SkyTower的绝大多数功能，PM、RD、DA们都会通过这个平台来使用。目前来看，SkyTower应该是一个传统的PC站，需要进行前端页面开发和服务端开发。前端主要包括首页、项目列表页、项目详情页、注册页、登陆页、账号信息修改页、开发记录页、内测调试页，服务端开发包含前端每个页面对应的接口、使用数据库对数据进行持久化存储等。

## 线上地址：http://101.200.197.197/#/
## SkyTower前端
- 技术栈 
  - react + antd 
  - 相关依赖：react-router4.0、BizCharts4、react-codemirror等 
- todo 
  - 功能开发 
    - 初始化前端项目 done 
    - 首页 done 
    - 项目列表页 done 
    - 项目详情页 done
      - 项目详情信息 done
      - pv、uv信息 done 
      - 同时在线信息 done 
      - 所有查询条件 done 
      - 用户行为事件 done
      - 计数事件 done 
      - 请求和响应 done 
      - Ajax错误率 done
      - 单点追查 done
      - 修改项目信息 done
      - 删除项目 done
    - 注册页 done 
    - 登陆页 done 
    - 账号信息修改页 done 
    - 开发记录页 无需开发 
    - 内测调试页（开发调试用) 无需开发 
  - 性能优化 
    - 首页移动端适配 
    - 详情页Sider移动端适配 
    - 鉴权方式调研与优化 
    - 提供聚合上报策略 
## 本地开发调试
- 很简单
  - npm install 
  - npm run dev 
- 也可以使用yarn
  - nvm use 12.13.0
  - yarn install
  - yarn run dev 
- 调试线上版本页面
  - 首页: http://localhost:9998/#/
  - 注册页: http://localhost:9998/#/login?page_type=register
  - 登陆页: http://localhost:9998/#/login?page_type=login
  - 用户信息更新页: http://localhost:9998/#/login?page_type=update&user_id=`${user_id}`
  - 项目列表页: http://localhost:9998/#/profile
  - 项目详情页: http://localhost:9998/#/detail?project_id=`${project_id}`
- 调试内测版本页面
  - 内测版本页面URL拼接规则：在UrlQuery上初始化use_env_tag=1和env=dev参数即可命中内测版页面，例如内测版本的项目列表页: http://localhost:9998/?use_env_tag=1&env=dev&/#/profile
  - 测试阶段需要先发布在内测版本页面，ready后再发布到正式版本页面

## 发布新feature到内测版本
```js
  import getEnv from './utils/getEnv.js'; 

  getUserInfo = () => {
    // this is new feature
    ...
  }

  render () {
    const { env } = getEnv();
    
    // 发布到内测版本的新feature: getUserInfo()
    const { res } = env === 'dev' && getUserInfo();

    return (
      env === 'dev' && (<div>在这里写发布到内测版本的html元素 ... </div>)
    );
  }
```

## 发布新feature到线上版本
删除以上判断条件即可

## 编译部署上线
npm run build

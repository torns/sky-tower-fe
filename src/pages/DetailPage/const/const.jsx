import React from 'react';
import { Menu } from 'antd';

// 手机端访问的菜单
export const menuOnPhone = (
  <Menu>
    <Menu.Item>
      <div>项目详情信息</div>
    </Menu.Item>
    <Menu.Item>
      <div>pv、uv信息</div>
    </Menu.Item>
    <Menu.Item>
      <div>同时在线信息</div>
    </Menu.Item>
    <Menu.Item>
      <div>所有查询条件</div>
    </Menu.Item>
    <Menu.Item>
      <div>用户行为事件</div>
    </Menu.Item>
    <Menu.Item>
      <div>计数事件</div>
    </Menu.Item>
    <Menu.Item>
      <div>请求和响应</div>
    </Menu.Item>
    <Menu.Item>
      <div>Ajax错误率</div>
    </Menu.Item>
    <Menu.Item>
      <div>单点追查</div>
    </Menu.Item>
    <Menu.Item>
      <div>修改项目信息</div>
    </Menu.Item>
    <Menu.Item danger>删除项目</Menu.Item>
  </Menu>
);
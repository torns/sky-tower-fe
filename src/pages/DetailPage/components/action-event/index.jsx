import React from 'react';
import { DatePicker, Form, Input, Button, Select, Table, Space, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';

const { RangePicker } = DatePicker;

const layout = {
  wrapperCol: {
      offset: 0,
      span: 100,
  },
  layout: 'horizontal'
};

const clientOptions = [
  { value: 'Android' },
  { value: 'iOS' }
];

const netTypeOptions = [
  { value: 'wifi' },
  { value: '2G' },
  { value: '3G' },
  { value: '4G' },
  { value: 'none' },
  { value: 'unknown' },
];

const getNetTypeIcon = (netType) => {
  switch (netType) {
    case 'wifi': return <Badge status="success" />;
    case '4G': return  <Badge status="processing" />;
    case 'none': return <Badge status="error" />;
    case 'unknown':  return <Badge status="default" />;
    default: return  <Badge status="warning" />;
  }
} 

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

class ActionEvent extends React.Component {
  constructor () {
    super();
    this.state = {

    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`模糊检索`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            检索
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            清空
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onFinish = (values) => {
    // 注意 label 和 value 的映射
    console.log('Success:', values);
    console.log(Number(values.date[0]));
    console.log(Number(values.date[1]));
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  render() {
    const columns = [
      {
        title: `事件名称 event`,
        dataIndex: 'event',
        key: 'event',
        ...this.getColumnSearchProps('event'),
        fixed: 'left',
        width: 100,
        render: text => <a>{text}</a>,
      },
      {
        title: `地理位置 location`,
        dataIndex: 'location',
        key: 'location',
        ...this.getColumnSearchProps('location'),
        width: 100,
      },
      {
        title: `设备型号 device_brand`,
        dataIndex: 'device_brand',
        key: 'device_brand',
        ...this.getColumnSearchProps('device_brand'),
        width: 100,
      },
      {
        title: `页面版本号 app_version`,
        dataIndex: 'app_version',
        key: 'app_version',
        ...this.getColumnSearchProps('app_version'),
        width: 100,
      },
      {
        title: `系统版本 system_version`,
        dataIndex: 'system_version',
        key: 'system_version',
        ...this.getColumnSearchProps('system_version'),
        width: 100,
      },
      {
        title: `客户端类型 client`,
        dataIndex: 'client',
        key: 'client',
        ...this.getColumnSearchProps('client'),
        render: text => <div>{text === 'iOS' ? '📱': '🤖'}{text}</div>,
        width: 100,
      },
      {
        title: ` 网络类型 net_type`,
        dataIndex: 'net_type',
        key: 'net_type',
        ...this.getColumnSearchProps('net_type'),
        render: text => <div>{getNetTypeIcon(text)}{text}</div>,
        width: 100,
      },
      {
        title: `ip地址 ip_address`,
        dataIndex: 'ip_address',
        key: 'ip_address',
        ...this.getColumnSearchProps('ip_address'),
        width: 100,
      },
      {
        title: `自定义参数 extra`,
        dataIndex: 'extra',
        key: 'extra',
        ...this.getColumnSearchProps('extra'),
        render: text => <a>{text}</a>,
        width: 150,
      },
      {
        title: `用户user_id`,
        dataIndex: 'uid',
        key: 'uid',
        ...this.getColumnSearchProps('uid'),
        width: 100,
      },
      {
        title: `时间time`,
        dataIndex: 'time',
        key: 'time',
        ...this.getColumnSearchProps('time'),
        width: 100,
        fixed: 'right'
      }
    ];
    
    const data = [
      {
        event: 'click_bottom_button',
        location: '北京市海淀区',
        device_brand: 'iPhone 11',
        app_version: '8.0.4',
        system_version: 'iOS 13.6',
        client: 'iOS',
        net_type: '4G',
        ip_address: '102.200.197.192',
        extra: "{userType: 'vip', userAccount: 125}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987123'
      },
      {
        event: 'image_upload',
        location: '北京市西城区',
        device_brand: 'hawei p30',
        app_version: '8.0.3',
        system_version: 'Android 9.0',
        client: 'Android',
        net_type: 'wifi',
        ip_address: '102.203.197.192',
        extra: "{userType: 'normal', userAccount: 125}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987163'
      },
      {
        event: 'click_bottom_button',
        location: '长沙市雨花石区',
        device_brand: 'iPhone 7',
        app_version: '8.0.0',
        system_version: 'iOS 10',
        client: 'iOS',
        net_type: 'none',
        ip_address: '102.200.197.192',
        extra: "{userType: 'undefined', userAccount: 0}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987103'
      },
      {
        event: 'image_upload_error',
        location: '南宁市江南区',
        device_brand: 'vivo unknown',
        app_version: '8.0.3',
        system_version: 'Android 4.4',
        client: 'Android',
        net_type: '3G',
        ip_address: '102.203.197.190',
        extra: "{userType: 'normal', userAccount: 0.5}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987160'
      },
      {
        event: 'click_bottom_button',
        location: '北京市海淀区',
        device_brand: 'iPhone 11',
        app_version: '8.0.4',
        system_version: 'iOS 13.6',
        client: 'iOS',
        net_type: '4G',
        ip_address: '102.200.197.192',
        extra: "{userType: 'vip', userAccount: 125}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987123'
      },
      {
        event: 'image_upload',
        location: '北京市西城区',
        device_brand: 'hawei p30',
        app_version: '8.0.3',
        system_version: 'Android 9.0',
        client: 'Android',
        net_type: 'wifi',
        ip_address: '102.203.197.192',
        extra: "{userType: 'normal', userAccount: 125}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987163'
      },
      {
        event: 'click_bottom_button',
        location: '长沙市雨花石区',
        device_brand: 'iPhone 7',
        app_version: '8.0.0',
        system_version: 'iOS 10',
        client: 'iOS',
        net_type: 'none',
        ip_address: '102.200.197.192',
        extra: "{userType: 'undefined', userAccount: 0}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987103'
      },
      {
        event: 'image_upload_error',
        location: '南宁市江南区',
        device_brand: 'vivo unknown',
        app_version: '8.0.3',
        system_version: 'Android 4.4',
        client: 'Android',
        net_type: '3G',
        ip_address: '102.203.197.190',
        extra: "{userType: 'normal', userAccount: 0.5}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987160'
      },
      {
        event: 'click_bottom_button',
        location: '北京市海淀区',
        device_brand: 'iPhone 11',
        app_version: '8.0.4',
        system_version: 'iOS 13.6',
        client: 'iOS',
        net_type: '4G',
        ip_address: '102.200.197.192',
        extra: "{userType: 'vip', userAccount: 125}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987123'
      },
      {
        event: 'image_upload',
        location: '北京市西城区',
        device_brand: 'hawei p30',
        app_version: '8.0.3',
        system_version: 'Android 9.0',
        client: 'Android',
        net_type: 'wifi',
        ip_address: '102.203.197.192',
        extra: "{userType: 'normal', userAccount: 125}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987163'
      },
      {
        event: 'click_bottom_button',
        location: '长沙市雨花石区',
        device_brand: 'iPhone 7',
        app_version: '8.0.0',
        system_version: 'iOS 10',
        client: 'iOS',
        net_type: 'none',
        ip_address: '102.200.197.192',
        extra: "{userType: 'undefined', userAccount: 0}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987103'
      },
      {
        event: 'image_upload_error',
        location: '南宁市江南区',
        device_brand: 'vivo unknown',
        app_version: '8.0.3',
        system_version: 'Android 4.4',
        client: 'Android',
        net_type: '3G',
        ip_address: '102.203.197.190',
        extra: "{userType: 'normal', userAccount: 0.5}",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        uid: '987160'
      }
    ];

    return (
      <div className="action-event">
        <div className="title">
          用户行为事件过滤器
        </div>
        <div className="filter-container">
            <Form
                {...layout}
                name="basic"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
              <div className="top-filter-container">
                <Form.Item name="event">
                    <Input placeholder="事件名称 event" />
                </Form.Item>

                <Form.Item name="location">
                    <Input placeholder="地理位置 location" />
                </Form.Item>

                <Form.Item name="device_brand">
                    <Input placeholder="机型 device_brand" />
                </Form.Item>

                <Form.Item name="app_version">
                    <Input placeholder="页面版本号 app_version" />
                </Form.Item>
              </div>

              <div className="center-filter-container">
                <Form.Item name="system_version">
                    <Input placeholder="系统版本 system_version" />
                </Form.Item>

                <Form.Item name="client">
                    <Select
                        mode="multiple"
                        showArrow
                        style={{ width: '100%' }}
                        options={clientOptions}
                        placeholder="客户端类型"
                    />
                </Form.Item>

                <Form.Item name="net_type">
                    <Select
                        mode="multiple"
                        showArrow
                        style={{ width: '100%' }}
                        options={netTypeOptions}
                        placeholder="网络类型 netType"
                    />
                </Form.Item>

                <Form.Item name="ip_address">
                    <Input placeholder="IP地址 ip_address" />
                </Form.Item>
              </div>

              <div className="bottom-filter-container">
                <Form.Item name="date">
                    <RangePicker showTime />
                </Form.Item>
              </div>
              <Form.Item>
                  <Button type="primary" htmlType="submit">
                      按条件过滤
                  </Button>
              </Form.Item>
            </Form>
        </div>
        <div className="title">
          用户行为事件 ActionEvent 列表
        </div>
        <div className="list-container">
          <Table
            columns={columns}
            dataSource={data} 
            style={{ marginTop: 24, marginBottom: 24 }}
            size="middle"
            scroll={{ x: 1800 }}
          />
        </div>
      </div>
    );
  }
}

export default ActionEvent;

import React from 'react';
import { DatePicker, Form, Input, Button, Select, Table, Space, Badge, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import getQuery from '../../../../utils/getQuery';
import reqwest from 'reqwest';
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
    default: return  "";
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
      data: []
    };
    this.query = getQuery();
  }

  componentDidMount () {
    this.getActionEvent({});
  }

  getActionEvent = (obj) => {
    reqwest({
      url: `${window.requestUrl}/get/list/action_event`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem("skyTowerUserId"),
        project_id: this.query.project_id,
        start_time: obj.date ? Number(obj.date[0]) : Number(new Date().getTime()) - 1000*60*60*24, // 不填就默认前一天
        end_time: obj.date ? Number(obj.date[1]) : Number(new Date().getTime()),
        event: obj.event,
        location: obj.location,
        device_brand: obj.device_brand,
        app_version: obj.app_version,
        system_version: obj.system_version,
        client: obj.client && obj.client.join(","),
        net_type: obj.net_type && obj.net_type.join(","),
        ip_address: obj.ip_address,
        token: localStorage.getItem("skyTowerToken")
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        this.setState({
          data: data.data
        });
        message.success('数据获取成功～ 😉');
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
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
    this.getActionEvent(values);
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
        render: text => <div>{text === 'iOS' ? '📱': text === 'Android' ? '🤖' : ''}{text}</div>,
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
        render: text => <a>{new Date(Number(text)).Format("yyyy-MM-dd HH:mm:ss")}</a>,
        width: 100,
        fixed: 'right'
      }
    ];
  
    const { data } = this.state;

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
                  <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
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

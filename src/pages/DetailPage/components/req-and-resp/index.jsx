import React from 'react';
import { Form, Input, Button, Select, Tag, Table, Space, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import getQuery from '../../../../utils/getQuery';
import reqwest from 'reqwest';
import './index.less';

const layout = {
    wrapperCol: {
        offset: 0,
        span: 100,
    },
    layout: 'horizontal'
};

const tailLayout = {
    wrapperCol: {
        offset: 2,
        span: 20,
    },
};

const successAndErrorOptions = [{
    label: 'is_error',
    value: 'gold'
},
{ 
    label: 'is_success',
    value: 'green'
}];

const reqAndRespOptions = [{
    label: 'req',
    value: 'lime'
},
{ 
    label: 'resp',
    value: 'cyan'
}];

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

class ReqAndResp extends React.Component {
  constructor () {
    super();
    this.state = {
      data: []
    };
    this.query = getQuery();
  }

  componentDidMount () {
    this.getHttpEventList({});
  }
  
  getTypeParam = (array) => {
    if (Array.isArray(array) && array.length === 1) {
      return array[0] === 'lime' ? 'req' : array[0] === 'cyan' ? 'resp' : '';
    } 
    return '';
  }

  getIsSuccessParam = (array) => {
    // 约定is_success = 2 表示既包含成功又包含失败请求
    if (Array.isArray(array) && array.length === 1) {
      return array[0] === 'gold' ? 0 : array[0] === 'green' ? 1 : 2;
    }
    return 2;
  }

  getHttpEventList = (obj) => {
    reqwest({
      url: `${window.requestUrl}/get/list/http_event`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem('skyTowerUserId'),
        project_id: this.query.project_id,
        uid: obj.user_id,
        api: obj.api,
        type: this.getTypeParam(obj.reqAndResp),
        is_success: this.getIsSuccessParam(obj.successAndError),
        token: localStorage.getItem('skyTowerToken')
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        this.setState({
          data: data.data
        });
        message.success('数据获取成功～ 😚');
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
    this.getHttpEventList(values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  renderTag = (props) => {
    const { label, value, closable, onClose } = props;

    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  } 

  render() {
    const { data = [] } = this.state;

    const columns = [
      {
        title: `用户user_id`,
        dataIndex: 'user_id',
        key: 'user_id',
        ...this.getColumnSearchProps('user_id'),
        fixed: 'left',
        width: 50,
      },
      {
        title: `接口地址api`,
        dataIndex: 'api',
        key: 'api',
        ...this.getColumnSearchProps('api'),
        width: 50,
      },
      {
        title: `事件类型type`,
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
        width: 50,
      },
      {
        title: `get请求参数query`,
        dataIndex: 'query',
        key: 'query',
        ...this.getColumnSearchProps('query'),
        width: 50,
      },
      {
        title: `post请求参数request_body`,
        dataIndex: 'request_body',
        key: 'request_body',
        ...this.getColumnSearchProps('request_body'),
        render: text => <a>{text}</a>,
        width: 50,
      },
      {
        title: `返回值resp`,
        dataIndex: 'resp',
        key: 'resp',
        ...this.getColumnSearchProps('resp'),
        render: text => <a>{text}</a>,
        width: 50,
      },
      {
        title: `时间time`,
        dataIndex: 'time',
        key: 'time',
        ...this.getColumnSearchProps('time'),
        render: text => <a>{new Date(Number(text)).Format("yyyy-MM-dd HH:mm:ss")}</a>,
        width: 50,
        fixed: 'right',
      }
    ];

    return (
      <div className="req-and-resp">
        <div className="title">
          请求与响应过滤器
        </div>
        <div className="filter-container">
            <Form
                {...layout}
                name="basic"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item name="api">
                    <Input placeholder="接口地址 api" />
                </Form.Item>

                <Form.Item name="user_id">
                    <Input placeholder="用户id user_id" />
                </Form.Item>

                <Form.Item name="successAndError">
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={this.renderTag}
                        style={{ width: '100%' }}
                        options={successAndErrorOptions}
                        placeholder="成功、失败"
                    />
                </Form.Item>


                <Form.Item name="reqAndResp">
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={this.renderTag}
                        style={{ width: '100%' }}
                        options={reqAndRespOptions}
                        placeholder="请求、响应"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        过滤
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="title">
          结果展示
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

export default ReqAndResp;

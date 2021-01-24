import React from 'react';
import { Form, Input, Button, Select, Tag, Table, Space } from 'antd';
import './index.less';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
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

class ReqAndResp extends React.Component {
  constructor () {
    super();
    this.state = {

    };
  }

  componentDidMount () {
    const { project_id } = this.props;
    console.log(project_id);
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
        width: 200,
      },
      {
        title: `post请求参数request_body`,
        dataIndex: 'request_body',
        key: 'request_body',
        ...this.getColumnSearchProps('request_body'),
        render: text => <a>{text}</a>,
        width: 200,
      },
      {
        title: `返回值resp`,
        dataIndex: 'resp',
        key: 'resp',
        ...this.getColumnSearchProps('resp'),
        render: text => <a>{text}</a>,
        width: 200,
      },
      {
        title: `时间time`,
        dataIndex: 'time',
        key: 'time',
        ...this.getColumnSearchProps('time'),
        width: 50,
        fixed: 'right'
      }
    ];

    const data = [
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/get/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '?user_id=3232324',
        request_body: '',
        resp: "{errNo: '0', errMessage: 'success', data: '{ username: 'baby123', age: 23, create_time: '2020.01.05' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/update/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '',
        request_body: "{ username: 'bob_aha', age: 24, status: '今天又是元气满满的一天。', email: '23788732@qq.com'}",
        resp: "{errNo: '0', errMessage: 'success', data: '{ status: 'post successful!' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/get/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '?user_id=3232324',
        request_body: '',
        resp: "{errNo: '0', errMessage: 'success', data: '{ username: 'baby123', age: 23, create_time: '2020.01.05' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/update/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '',
        request_body: "{ username: 'bob_aha', age: 24, status: '今天又是元气满满的一天。', email: '23788732@qq.com'}",
        resp: "{errNo: '0', errMessage: 'success', data: '{ status: 'post successful!' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/get/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '?user_id=3232324',
        request_body: '',
        resp: "{errNo: '0', errMessage: 'success', data: '{ username: 'baby123', age: 23, create_time: '2020.01.05' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/update/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '',
        request_body: "{ username: 'bob_aha', age: 24, status: '今天又是元气满满的一天。', email: '23788732@qq.com'}",
        resp: "{errNo: '0', errMessage: 'success', data: '{ status: 'post successful!' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/get/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '?user_id=3232324',
        request_body: '',
        resp: "{errNo: '0', errMessage: 'success', data: '{ username: 'baby123', age: 23, create_time: '2020.01.05' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/update/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '',
        request_body: "{ username: 'bob_aha', age: 24, status: '今天又是元气满满的一天。', email: '23788732@qq.com'}",
        resp: "{errNo: '0', errMessage: 'success', data: '{ status: 'post successful!' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/get/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '?user_id=3232324',
        request_body: '',
        resp: "{errNo: '0', errMessage: 'success', data: '{ username: 'baby123', age: 23, create_time: '2020.01.05' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/update/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '',
        request_body: "{ username: 'bob_aha', age: 24, status: '今天又是元气满满的一天。', email: '23788732@qq.com'}",
        resp: "{errNo: '0', errMessage: 'success', data: '{ status: 'post successful!' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/update/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '',
        request_body: "{ username: 'bob_aha', age: 24, status: '今天又是元气满满的一天。', email: '23788732@qq.com'}",
        resp: "{errNo: '0', errMessage: 'success', data: '{ status: 'post successful!' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/get/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '?user_id=3232324',
        request_body: '',
        resp: "{errNo: '0', errMessage: 'success', data: '{ username: 'baby123', age: 23, create_time: '2020.01.05' }'}"
      },
      {
        time: String(new Date()),
        user_id: '327832',
        api: '/update/user/info',
        type: 'req',
        is_success: true,
        is_error: false,
        query: '',
        request_body: "{ username: 'bob_aha', age: 24, status: '今天又是元气满满的一天。', email: '23788732@qq.com'}",
        resp: "{errNo: '0', errMessage: 'success', data: '{ status: 'post successful!' }'}"
      },
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
            // pagination={false}
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

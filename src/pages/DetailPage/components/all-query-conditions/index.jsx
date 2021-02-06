import React from 'react';
import { Collapse, Select, Table, Input, Button, Space, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { ACTION } from '../../const/const';
import getQuery from '../../../../utils/getQuery';
import reqwest from 'reqwest';
import './index.less';

const { Panel } = Collapse;
const { Option } = Select;

class AllQueryConditions extends React.Component {
  constructor () {
    super();
    this.state = {
      expandIconPosition: 'right',
      searchText: '',
      searchedColumn: '',
      data: []
    };
    this.query = getQuery();
  }

  componentDidMount () {
    reqwest({
      url: `${window.requestUrl}/get/filter/action_event`,
      method: 'get',
      type: 'json',
      crossOrigin: true, /* 跨域请求 */
      data: {
        user_id: localStorage.getItem("skyTowerUserId"),
        project_id: this.query.project_id,
        token: localStorage.getItem("skyTowerToken")
      }
    }).then((res) => {
      const { err_no, err_message, data } = res;
      if (err_no === 0) {
        message.success('数据获取成功～ 😉');
        this.setState({
          data: data.data
        });
      } else {
        message.error(err_message || '似乎还有点问题...');
      }
    });
  }

  onPositionChange = expandIconPosition => {
    this.setState({ expandIconPosition });
  };

  callback = (key) => {
    console.log(key);
  }

  getPanelHeaderTitle = (key) => {
    return ACTION[key] ? ACTION[key] : key;
  }

  getTableData = (obj) => {
    let result = [];
    Object.values(obj).map((valueObj, i) => {
      Object.keys(valueObj).map((key, j) => {
        const temp = {
          key: key || "未上报",
          value: valueObj[key]
        }
        result.push(temp);
      })
    });
    return result;
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`检索 ${this.getPanelHeaderTitle(dataIndex)}`}
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

  render() {
    const { expandIconPosition, data = [] } = this.state;

    const columns = [
      {
        title: 'key',
        dataIndex: 'key',
        key: 'key',
        width: '45%',
        ...this.getColumnSearchProps('key'),
      },
      {
        title: 'value',
        dataIndex: 'value',
        key: 'value',
        sorter: (a, b) => a.value - b.value,
        style: { marginLeft: 50 }
      }
    ];

    return (
      <div className="all-query-conditions">
        <div className="title">
          用户行为事件上报总览（所有查询条件）
        </div>
        <div className="collapse">
          <Collapse
            defaultActiveKey={['0']}
            onChange={this.callback}
            expandIconPosition={expandIconPosition}
            ghost
          >
            {Array.isArray(data) && data.map((obj, index) => {
              return (
                <Panel header={this.getPanelHeaderTitle(Object.keys(obj)[0])} key={index}>
                  <Table
                    columns={columns}
                    dataSource={this.getTableData(obj)} 
                    pagination={false}
                    size="middle"
                  />
                </Panel>
              );
            })}
          </Collapse>
        </div>
        <div className="select">
          <Select
            value={expandIconPosition}
            onChange={this.onPositionChange}
          >
            <Option value="left">左</Option>
            <Option value="right">右</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default AllQueryConditions;

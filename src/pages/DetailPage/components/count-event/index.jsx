import React from 'react';
import { Space, DatePicker, Table, Input, Button } from 'antd';
import { Chart, Geom, Axis, Tooltip, Coord } from 'bizcharts';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import './index.less';

const { RangePicker } = DatePicker;

class CountEvent extends React.Component {
  constructor () {
    super();
    this.state = {
      
    };
  }

  componentDidMount () {
    const { project_id } = this.props;
    console.log(project_id);
  }

  handleDatePickerChange = (moment, dateString) => {
    console.log(Number(moment[0]), dateString[0]);
    console.log(Number(moment[1]), dateString[1]);
  }

  getBarData = (countEventData) => {
    let data = [];
    Object.keys(countEventData).map((event, index) => {
      const temp = {
        event,
        count: countEventData[event]
      }
      data.push(temp);
    });
    return data;
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`事件名模糊检索`}
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
    const countEventData = {
      'image_upload': 130,
      'image_upload_success': 116,
      'image_upload_no_permission': 5,
      'image_upload_net_error': 9
    };

    const columns = [
      {
        title: `事件名 event`,
        dataIndex: 'event',
        key: 'event',
        width: '45%',
        ...this.getColumnSearchProps('event'),
      },
      {
        title: `事件触发次数 count`,
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        style: { marginLeft: 50 }
      }
    ];

    const data = this.getBarData(countEventData);

    return (
      <div className="count-event">
        <div className="title">
          按时间过滤计数事件
        </div>
        <div className="date-picker">
          <Space direction="vertical" size={12}>
            <RangePicker showTime onChange={this.handleDatePickerChange}/>
          </Space>
        </div>
        <div className="count-event-bar">
          <Chart
            height={330}
            data={data}
            padding="auto"
            appendPadding={[0, 0, 36, 0]}
            autoFit
          >
            <Coord transpose />
            <Axis name="event" />
            <Axis name="count" visible={true} />
            <Tooltip />
            <Geom
              type="interval"
              position="event*count"
              color={['count', '#bae637-#cf1322']}
            >
            </Geom>
          </Chart>
        </div>
        <div className="count-event-table">
          <div className="title">
            按事件名检索计数事件
          </div>
          <Table
            columns={columns}
            dataSource={data} 
            pagination={false}
            style={{ marginTop: 24, marginBottom: 24 }}
            size="middle"
          />
        </div>
      </div>
    );
  }
}

export default CountEvent;
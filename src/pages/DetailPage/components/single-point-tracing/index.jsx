import React from 'react';
import { Input, Space, DatePicker, Checkbox } from 'antd';
import ReactJson from 'react-json-view';
import './index.less';

const { Search } = Input;
const { RangePicker } = DatePicker;

class SinglePointTracing extends React.Component {
  constructor () {
    super();
    this.state = {
      isOnlyGetHttpInfo: false
    };
  }

  componentDidMount () {
    const { project_id } = this.props;
    console.log(project_id);
  }

  onSearch = value => {
    console.log(value);
  }

  handleDatePickerChange = (moment, dateString) => {
    console.log(Number(moment[0]), dateString[0]);
    console.log(Number(moment[1]), dateString[1]);
  }

  onCheckBoxChange = (e) => {
    this.setState({
      isOnlyGetHttpInfo: e.target.value
    })
  }

  render() {
    const { isOnlyGetHttpInfo } = this.state;

    const data = {
        "err_no": 0,
        "err_message": "success", 
        "data": [
          {
            "xxx/getUserInfo": {
              "success_count": "1523",
              "error_count": "268",
            },
          },
          {
            "xxx/getProjectInfo": {
              "success_count": "7223",
              "error_count": "323",
            }
          }
        ]
    };

    return (
      <div className="single-point-tracing">
        <div className="title">
          根据给定 user_id 追查问题
        </div>
        <div className="search-container">
          <Search placeholder="请输入 user_id 追查问题" allowClear onSearch={this.onSearch} style={{ width: 390 }} enterButton />
          <div className="search-filter">
            <Space direction="vertical" size={12}>
              <RangePicker showTime onChange={this.handleDatePickerChange}/>
            </Space>
            <div className="checkbox">
              <Checkbox defaultChecked={isOnlyGetHttpInfo} onChange={this.onCheckBoxChange} />
              <div className="checkbox-label">仅查询网络请求</div>
            </div>
          </div>
        </div>
        <div className="title">
          日志查询结果
        </div>
        <div className="search-response">
          <div className="react-json-container">
            <ReactJson src={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePointTracing;

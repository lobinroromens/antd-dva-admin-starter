import React,{Component} from 'react';
import { Table ,Icon,Popconfirm} from 'antd';
import { Link } from 'dva/router';
export default class AddressList extends Component {
    handleClick(id){
      this.props.viewAdressDetail(id)
    }
    handleDelete(id){
      this.props.addressDelete(id)
    }
    render() {
      const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text,record) => <Link to={`addressView/${record.key}`} onClick={this.handleClick.bind(this,record.key)}>{text}</Link>,
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="确定要删除？"
              okText="确定"
              cancelText="取消"
              onConfirm={this.handleDelete.bind(this,record.key)}
              >
            <a href="javaxcript:void(0)">删除</a>
            </Popconfirm>
            <span className="ant-divider"></span>
            <a href="javaxcript:void(0)">修改</a>
          </span>
        ),
      }];
        return (
            <div>
              <Table columns={columns} loading={this.props.loading} dataSource={this.props.dataSource} />
            </div>
        );
    }
}

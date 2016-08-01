import React,{Component} from 'react';
import {Card} from 'antd';
import styles from './view.less';
import {Link} from 'dva/router';
export default class AddressView extends Component {
    render() {
      const detail = this.props.detail;
        return (
            <div className={styles.address}>
            <Card
              title={detail.name}
              bordered={true}
              style={{ width: 300 }}
              extra={<Link to="addressModify">修改</Link>}
              >
              <p><strong>姓名:</strong>{detail.name}</p>
              <p><strong>年龄:</strong>{detail.age}</p>
              <p><strong>地址:</strong>{detail.address}</p>
            </Card>
            </div>
        );
    }
}

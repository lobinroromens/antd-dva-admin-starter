import React, { Component, PropTypes } from 'react'
import { Link } from 'dva/router';
import { Menu } from 'antd';
import styles from './common.less';
class Header extends Component {
    render() {
        return (
          <div className={styles.header}>
            <Menu mode='horizontal' selectedKeys={["title"]}>
              <Menu.Item key="title">用户通讯录CRUD操作DEMO</Menu.Item>
              <Menu.Item key="login">
                <Link to='/login'>登录页面</Link>
              </Menu.Item>
              <Menu.Item key="loginout">
                <Link to='/loginout'>注销登录</Link>
              </Menu.Item>
            </Menu>
          </div>
        )
    }
}
export default Header

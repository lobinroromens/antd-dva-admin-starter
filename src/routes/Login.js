import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import {Card,Button,Form,Input} from "antd";
import styles from './login.less';
const FormItem = Form.Item;
let Login = React.createClass({
  handleSubmit(e){
    e.preventDefault();
    this.props.dispatch({
        type: 'user/login',
        payload: {
          userName:this.props.form.getFieldProps('userName').value,
          password:this.props.form.getFieldProps('password').value
        }
      });
  },
  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  },
  render(){
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const nameProps = getFieldProps('userName', {
      rules: [
        { required: true, min: 4, message: '用户名为test' },
        { validator: this.userExists },
      ],
    });
    const passwdProps = getFieldProps('password', {
      rules: [
        { required: true, min: 4, message: '密码为test' },
        { validator: null },
      ],
    });
    return (
      <div className={styles.wraper}>
        <Card title="欢迎登录" bordered={true} className={styles.center}>
          <Form  onSubmit={this.handleSubmit} horizontal>
            <FormItem
              label="用户名:"
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating('name') ? '校验中...' : (getFieldError('userName') || []).join(', ')}
              >
            <Input
              placeholder="请输入用户名"
              {...nameProps}
            />
            </FormItem>
            <FormItem
            label="密码:"
            {...formItemLayout}
            hasFeedback
            >
            <Input placeholder="请输入密码"
              {...passwdProps}
            />
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" onClick={this.handleSubmit} loading={this.props.user.logining}>确定</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }

  })
Login = Form.create()(Login);
function mapStateToProps({ user , routing}) {
  return {user,routing};
}
export default connect(mapStateToProps)(Login);

import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './IndexPage.less';
import MainLayout from '../components/common/MainLayout';
import AddressView from '../components/AddressView';
function IndexPage({ dispatch, addressList}){
  const {current} = addressList;
  return(
    <MainLayout>
      <AddressView detail={current}/>
    </MainLayout>
  )
}
function mapStateToProps({ addressList }) {
  return {addressList};
}

export default connect(mapStateToProps)(IndexPage);

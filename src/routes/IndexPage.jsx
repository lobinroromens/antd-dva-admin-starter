import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './IndexPage.less';
import MainLayout from '../components/common/MainLayout';
import AddressList from '../components/AddressList';
function IndexPage({ dispatch, addressList }){
  const {isLoading,data} = addressList;
  const viewAdressDetail= function(id){
    dispatch({
      type:'addressList/view',
      payload:{
        key:id
      }
    })
  };
  const addressDelete=function(id){
    console.log(id+"deleted");
  };
  const tableProps={
    dataSource:data,
    loading:isLoading,
    viewAdressDetail:viewAdressDetail,
    addressDelete:addressDelete
  }

  return(
    <MainLayout>
      <AddressList {...tableProps}/>
    </MainLayout>
  )
}
function mapStateToProps({ addressList }) {
  return {addressList};
}

export default connect(mapStateToProps)(IndexPage);

import { call, put } from 'dva/effects';
import { getAddressList ,getAddressDetail,deleteAddressList} from '../services/getAddressList';
import { Router, Route, hashHistory } from 'dva/router';
export default {
  namespace:'addressList',
  state:{
    data:[],
    current:{},
    isLoading:true
  },
  subscriptions: [
    function (dispatch) {
      hashHistory.listen(location => {
        var pathArr = location.pathname.split('/');
        if (location.pathname === '/') {
          dispatch({
            type: 'getAddressList'
          });
        }
        if(pathArr[1]=='addressView'&&pathArr.length=='3'){
          dispatch({
            type:'addressList/view'
          })
        }
      });
    }
  ],
  reducers:{
    ['getAddressList'](state,action){
      return {...state,isLoading:true}
    },
    ['getAddressList/Success'](state,action){
      return {...state,isLoading:false,...action.payload}
    },
    ['addressList/detail'](state,action){
      return {...state,...action.payload}
    }
  },
  effects:{
    *['getAddressList']({state,payload}){
      const { data } = yield call(getAddressList,payload);
      if (data.success) {
        yield put({
          type: 'getAddressList/Success',
          payload:{
            data:data.data,
          }
        });
      }
    },
    *['addressList/view']({state,payload}){
      const {data} = yield call(getAddressDetail,payload);
      if(data.success){
        yield put({
          type:'addressList/detail',
          payload:{
            current:data.data[1]
          }
        })
      }
    },
    *['addressList/delete'](state,payload){
      const {data} = yield call(deleteAddressList,state.payload);
      if (data.success) {
        yield put({
          type: 'getAddressList/Success',
          payload:{
            data:data.data,
          }
        });
      }
    }
  }
}

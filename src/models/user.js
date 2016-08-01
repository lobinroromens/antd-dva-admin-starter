import { call, put } from 'dva/effects';
import {login} from '../services/user';
import { Router, Route, hashHistory } from 'dva/router';
export default {

  namespace: 'user',

  state: {
    logining:false,
    uid:'',
    userName:'test',
    password:'test',
    token:'token',
    isLogined:false
  },

  subscriptions: [
    function(dispatch) {
      hashHistory.listen(location => {
        if (location.pathname === '/loginout') {
          dispatch({
            type: 'user/loginout'
          });
        }
      });
    },
  ],
  reducers: {
    ['user/login'](state, action) {
      return { ...state, logining:true};
    },
    ['user/login/success'](state,action){
      localStorage.token = action.payload.token;
      return {...state,logining:false,...action.payload}
    },
    ['user/login/failure'](state,action){
      return {...state,logining:false,...action.payload}
    },
    ['user/loginout'](state,action){
      localStorage.removeItem('token')
      return {...state,logining:false,isLogined:false}
    }
  },
  effects: {
    *['user/login']({state,payload}) {
      const { data } = yield call(login,payload);
      if (data.success) {
        yield put({
          type: 'user/login/success',
          payload:{
            token:data.data.token,
            uid:data.data.uid,
            userName:data.data.username,
            isLogined:true
          }
        });
        yield call(hashHistory.push, {
        pathname: '/',
      });
      }
      if (!data.success) {
        yield put({
          type:'user/login/failure',
          payload:{
            logining:false
          }
        })
      }
    },
  }

}

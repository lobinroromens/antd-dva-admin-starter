import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import dva, { connect } from 'dva';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Loginout from './routes/Loginout';
import AddressView from './routes/AddressView';
export default function({ history }) {
  function requireAuth(nextState, replace) {
    if (!!!localStorage.token) {
      replace({
        pathname: '/login',
      })
    }
  }
  return (
    <Router history={history}>
      <Route path="/" onEnter={requireAuth}>
        <IndexRoute component={IndexPage} />
        <Route path="addressView/:id" component={AddressView} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="loginout" component={Loginout} />
    </Router>
  );
};

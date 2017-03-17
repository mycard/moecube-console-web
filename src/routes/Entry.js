import React from 'react';
import { connect } from 'dva';
import styles from './Entry.less';
import Nav from '../components/Common/Nav'
import { Router, Route, browserHistory } from 'dva/router';


import {Layout} from 'antd'

function Entry({ children, collapsed, mode, dispatch }) {

  const NavProps = {
    collapsed, 
    mode, 
    dispatch
  }

  return (
    <Layout style={{ flexDirection: 'row', minHeight: '100%'}}>
      <Nav {...NavProps}/>
      <Layout style={{ minHeight: '400px'}}>
        {children}
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  const {
    Common: {collapsed, mode}
  } = state
  return {
    collapsed,
    mode
  };
}

export default connect(mapStateToProps)(Entry);

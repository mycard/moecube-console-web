import React from 'react';
import styles from './Nav.less';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import {Link} from 'dva/router'
import {connect} from 'dva'
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu


@connect(
  (state, props) => {
    const {
      Common: {collapsed, mode}
    } = state
    return {
      collapsed,
      mode
    }
  }
)
export default class Nav extends React.Component {

  render(){
    const { collapsed, mode, dispatch } = this.props
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => dispatch({ type: 'Common/collapsed' })}>
        <div className={styles.logo} />
        <Menu theme="dark" mode={mode} defaultSelectedKeys={['0']}>

          <Menu.Item key="0">
            <Link to="/apps">
              <Icon type="windows-o" />
              <span className="nav-next">
                apps
              </span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

import React from 'react';
import styles from './Nav.less';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import {Link} from 'dva/router'
import { FormattedMessage } from 'react-intl'
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu

function Nav({ collapsed, mode, dispatch }) {
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
                <FormattedMessage id="Apps"/>
              </span> 
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Nav;

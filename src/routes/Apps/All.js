import React from 'react';
import { connect } from 'dva';
import styles from './All.less';
import { routerRedux } from 'dva/router';
import { Button, Affix, Icon } from 'antd'
import Create from '../../components/App/Create'


class Apps extends React.Component {

  render() {
    const { dispatch, isCreate, isSubmit } = this.props

    const CreateProps = {
      visible: isCreate,
      isLoading: isSubmit,
      onCancel: () => dispatch({ type: 'App/onCancel'}),
      onCreate: () => dispatch({ type: 'App/onCreate'}),
      onSubmit: (payload) => dispatch({ type: 'App/submit', payload}),
    }

    const CreateButtonProps = {
      onClick: () => dispatch({ type: 'App/onCreate'}),
      className: styles.CreateBtn,
      shape: "circle",
      type: "primary",
      size: "large",
    }


    return (
    <div className={styles.normal}>

      <Affix style={{ position: 'absolute', bottom: 50, right: 50}}>
        <Button {...CreateButtonProps} >
          <Icon type="plus" />
        </Button>
      </Affix>

      <Create {...CreateProps}/>
    </div>
    )
  }
}
function mapStateToProps(state) {
  const {
    App: { isCreate, isSubmit }
  } = state
  return {
    isCreate,
    isSubmit
  };
}

export default connect(mapStateToProps)(Apps);

import React from 'react';
import {connect} from 'dva';
import styles from './LoginCallback.css';


class LoginCallback extends React.Component {

  componentDidMount() {
    const {location: {query: {sso}}, dispatch} = this.props
    const user = toObject(new URLSearchParams(Buffer.from(sso, 'base64').toString()))

    if (user) {
      dispatch({type: "user/ssoLogin", payload: { user } })
    }
  }

  render() {
    const {dispatch, location} = this.props

    return (
      <div className={styles.normal}>

      </div>
    )
  }
}
function LoginCallback({}) {


  return (
    <div className={styles.normal}>
      {JSON.stringify(data)}
    </div>
  );
}

function mapStateToProps({}) {
  return {};
}


function toObject(entries) {
  let result = {};
  for (let [key, value] of entries) {
    result[key] = value;
  }
  return result;
}
export default connect(mapStateToProps)(LoginCallback);

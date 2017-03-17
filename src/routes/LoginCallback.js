import React from 'react';
import { connect } from 'dva';
import styles from './LoginCallback.css';


class LoginCallback extends React.Component{

  componentDidMount() { 
    const { location: { query: { sso }}, dispatch } = this.props
    console.log(this.props)
    const data = toObject(new URLSearchParams(Buffer.from(sso, 'base64').toString()))
    
    if (data) {
      dispatch({type: "user/change", payload:{ data }})
      localStorage.setItem("user", JSON.stringify(data))
    }
  }

  render(){
    const {dispatch, location} = this.props

    return (
      <div className={styles.normal}>

      </div>
    )
  }
}
function LoginCallback({  }) {


   
  return (
    <div className={styles.normal}>
    {JSON.stringify(data)}
    </div>
  );
}

function mapStateToProps({  }) {
  return {

  };
}


function toObject(entries){
  let result = {};
    for (let [key, value] of entries) {
        result[key] = value;
    }
    return result;
}
export default connect(mapStateToProps)(LoginCallback);

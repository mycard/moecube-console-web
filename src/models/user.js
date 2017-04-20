import {routerRedux} from 'dva/router'

export default {
  namespace: 'user',
  state: {
  },
  reducers: {
    ssoLogin(state, action){
      return {
        ...state, ...action.payload
      }
    }
  },
  effects: {
    *ssoLogin({payload}, {put, call}) {
      yield put(routerRedux.push('/apps'))
    }
  },
  subscriptions: {},
};

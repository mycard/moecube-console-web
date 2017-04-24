import {routerRedux} from 'dva/router'
import config from '../config'
import * as crypto from 'crypto'

export default {
  namespace: 'Common',
  state: {
    collapsed: false,
    mode: 'inline',
    isUpload: false,
    percent: 0,
    uploadStatus: '',
  },
  reducers: {
    upload(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    collapsed (state) {
      const mode = state.collapsed ? 'inline' : 'vertical'
      return {...state, collapsed: !state.collapsed, mode}
    }
  },
  effects: {
    *init({payload}, {put, call, select}) {
      const {user} = yield select(state => state.user)
      if (!user) {
        yield put(routerRedux.replace('/login'))
      }
      // yield put({ type: 'Apps/fetch' })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {

      return history.listen(({pathname, query}) => {
        if (pathname === '/login') {
          let params = new URLSearchParams()
          params.set('return_sso_url', config.returnSSO)
          let payload = Buffer.from(params.toString()).toString('base64')
          let url = new URL(config.SSOProvider)
          params = url['searchParams'];
          params.set('sso', payload);
          params.set('sig', crypto.createHmac('sha256', 'zsZv6LXHDwwtUAGa').update(payload).digest('hex'))

          window.location.href = url
        } else if (pathname === '/apps') {
          dispatch({ type: 'Apps/fetch', query })
        }
      })
    }
  },
};

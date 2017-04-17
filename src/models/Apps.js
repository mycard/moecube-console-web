import {fetch, update} from '../services/Apps'
import * as crypto from 'crypto'
import {message} from 'antd'
import config from '../config'


export default {
  namespace: 'Apps',
  state: {
    apps: {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
  },
  effects: {
    *fetch({payload}, {call, put}) {

      try {
        const {data} = yield call(fetch, payload)

        let apps = {}
        if (data && data.length > 0) {
          data.map(app => {
            apps[app["id"]] = app
          })
        }

        yield put({type: 'save', payload: {apps}})
      } catch (error) {
        message.error(error.message)
      }
    },
    *update({payload}, {call, put}){
      try {
        const {data} = yield call(update, payload)

        if (data) {
          yield put({type: 'success'})
          message.info("i18n success")
        }
      } catch (error) {
        message.error(error.message)
      }
    },
    *addPackage({payload}, {call, put}){
      try {
        const {data} = yield call(update, payload)

        if (data) {
          yield put({type: 'success'})
        }
      } catch (error) {
        message.error(error.message)
      }
    },
    *success({payload}, {call, put}) {
      yield put({type: 'fetch'})
    }
  },
  subscriptions: {
    setup({dispatch, history}) {

      dispatch({type: 'fetch'})

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
        }
      })
    }
  },
};

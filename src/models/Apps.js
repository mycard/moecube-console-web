import {fetch, update} from '../services/Apps'
import {message} from 'antd'


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
    *fetch({payload}, {call, put, select}) {

      const {user: {id: author, admin}} = yield select(state => state.user)

      try {
        const {data} = yield call(fetch, {...payload, author, admin})

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

    }
  },
};

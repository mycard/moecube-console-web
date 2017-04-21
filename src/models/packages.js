import {fetch, add, del, patch, urlUpload} from '../services/Packages'
import {message} from 'antd'

export default {
  namespace: 'packages',
  state: {
    packages: {},
  },
  reducers: {
    fetchSuccess(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    success(state, action) {
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
        yield put({ type: 'fetchSuccess', payload: {packages: data}})
      } catch (e) {
        message.error(e.message)
      }
    },
    *add({payload}, {call, put}) {
      try {
        const {data} = yield call(add, payload)
        yield put({ type: 'success', payload: {packages: data}, appId: payload.appId})
      } catch (e) {
        message.error(e.message)
      }
    },
    *patch({payload}, {call, put}) {
      try {
        const {data} = yield call(patch, payload)
        yield put({ type: 'success', payload: {packages: data}, appId: payload.appId})
      } catch (e) {
        message.error(e.message)
      }
    },
    *delete({payload}, {call, put}) {
      try {
        const {data} = yield call(del, payload)
        yield put({ type: 'success', payload: {packages: data}, appId: payload.appId})
      } catch (e) {
        message.error(e.message)
      }
    },
    *urlUpload({payload}, {call, put}) {
      try {
        const {data} = yield call(urlUpload, payload)
        yield put({ type: 'success', payload: {packages: data}, appId: payload.appId})
        message.info('上传成功, 打包中...')
      } catch (e) {
        message.error(e.message)
      }
    },
    *success({appId}, {call, put}) {
      yield put({ type: 'fetch', payload: { appId }})
    }
  },
  subscriptions: {},
};

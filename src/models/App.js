import { create } from '../services/Apps'

export default {
  namespace: 'App',
  state: {
    isSubmit: false,
    isCreate: false,
    id: null,
    name: null,
    locale: null
  },
  reducers: {
    onCreate(state, action) {
      return {
        ...state,
        isCreate: true
      }
    },
    SubmitRequest(state, action) {
      return {
        ...state,
        ...action.payload,
        isSubmit: true,
      }
    },
    SubmitSuccess(state, action){
      return {
        ...state,
        isSubmit: false,
        isCreate: false
      }
    },
    onCancel(state, action) {
      return {
        ...state,
        isCreate: false,
        isSubmit: false
      }
    },
    reset(state, action) {
      return {
        ...state,
        isSubmit: false,
        isCreate: false,
        id: null,
        name: null,
        locale: null
      }
    }
  },
  effects: {
    *submit({ payload }, { call, put }){
      yield put({ type: 'SubmitRequest', payload })

      const params = {
        id: payload.id,
        name: {
          [payload.locale]: payload.name
        }
      }

      const req = yield call(create, params)
      if(req.data) {
        yield put({ type: 'SubmitSuccess' })
        yield put({ type: 'reset' })
        // TODO: 成功提示
      }
      // TODO: 错误处理
    }
  },
  subscriptions: {},
};

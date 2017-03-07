import { fetch } from '../services/Apps'

export default {
  namespace: 'Apps',
  state: {
    list: [],
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
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(fetch, payload)
      yield put({ type: 'save', payload: { list: data }})
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query}) => {
        if(pathname === '/apps') {
          dispatch({ type: 'fetch', payload: query})
        }
      })
    }
  },
};

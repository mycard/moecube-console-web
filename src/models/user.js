
export default {
  namespace: 'user',
  state: {
  },
  reducers: {
    change(state, action){
      return {
        ...state, ...action.payload
      }
    }
  },
  effects: {},
  subscriptions: {},
};

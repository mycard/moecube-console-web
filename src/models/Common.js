
export default {
  namespace: 'Common',
  state: {
    collapsed: false,
    mode: 'inline'
  },
  reducers: {
    collapsed (state) {
      const mode = state.collapsed ? 'inline' : 'vertical'
      return { ...state, collapsed: !state.collapsed, mode }
    }
  },
  effects: {},
  subscriptions: {},
};

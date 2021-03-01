import { ImmerModel } from 'mdf';

/**
 * @file 默认 model 的栗子
 */

interface State {
  company: string;
};

export default {
  namespace: 'foo',

  state: {
    company: '好未来',
  },

  effects: {
    *testLoading(_, { put }) {
      const res = yield new Promise(function (resolve) {
        setTimeout(function () {
          resolve('delay 2000');
        }, 2000);
      });

      yield put({
        type: 'changeCompany',
        payload: '好未来 20201'
      });
    },
  },

  reducers: {
    /**
     * immer 修改 company
     */
    changeCompany(state, action) {
      state.company = action.payload;
    },
  },
} as ImmerModel<State>;

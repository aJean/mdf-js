import { Model } from 'mdf';
import request from '../api/request';

/**
 * @file 代理测试
 */

const ProxyModel: Model = {
  state: {
    name: '乔岳',
    money: 100,
    beauty: 50,
  },

  effects: {
    *yapiRequest(_, { put }) {
      const res = yield request.get('/qy/yapi');

      yield put({
        type: 'yapiRequestSuccess',
        payload: JSON.stringify(res.data),
      });
    },

    *checkApp(_, { put }) {
      const res = yield request.get('/platform/checkApp');

      yield put({
        type: 'checkAppSuccess',
        payload: JSON.stringify(res.data),
      });
    },

    *addWatchVideoLog(_, { put }) {
      const res = yield request.post('/v1/api/study/addWatchVideoLog', { questionId: 1, isOverTime: true });

      yield put({
        type: 'addWatchVideoLogSuccess',
        payload: JSON.stringify(res.data),
      });
    },
  },

  reducers: {
    checkAppSuccess(state, action) {
      return { ...state, money: action.payload };
    },

    addWatchVideoLogSuccess(state, action) {
      return { ...state, beauty: action.payload };
    },

    yapiRequestSuccess(state, action) {
      return { ...state, name: action.payload };
    },
  },
};

export default ProxyModel;

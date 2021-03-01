import { Model } from 'mdf';
import request from '../api/request';

/**
 * @file dva model
 */

const PayModel: Model = {
  namespace: 'pay',

  state: {
    name: '乔岳',
    money: 100,
    beauty: 50,
  },

  effects: {
    *addMoney(_, { put }) {
      try {
        const res = yield request.get('/qy/yapi');
        console.log(res);
        yield put({
          type: 'addMoneySuccess',
          payload: 200,
        });
      } catch (e) {
        console.log(e);
      }
    },

    *addBeauty(_, { put }) {
      try {
        const res = yield request.post('/user/loginByEmail', { bodyType: 'json' });
        console.log(res);
        yield put({
          type: 'addBeautySuccess',
          payload: 100,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },

  reducers: {
    addMoneySuccess(state, action) {
      return { ...state, money: action.payload };
    },

    addBeautySuccess(state, action) {
      return { ...state, beauty: action.payload };
    },

    changeName(state) {
      return { ...state, name: 'qiaoyue' };
    },
  },
};

export default PayModel;

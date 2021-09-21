import { createModel } from 'mdf';
import { changeTitle } from '../api/api';

/**
 * @file 测试 rematch model
 */

type TitleState = {
  name: string;
};

export default createModel({
  state: {
    name: 'rematch witch hooks',
  } as TitleState,

  effects: (dispatch: any) => {
    return {
      async changeTitle(): Promise<any> {
        const res: any = await changeTitle();
        dispatch.rematch_title.SET_Title(res.msg);
      },
    };
  },

  reducers: {
    SET_Title: (state: TitleState, name: string) => {
      return {
        ...state,
        name,
      };
    },
  },
});

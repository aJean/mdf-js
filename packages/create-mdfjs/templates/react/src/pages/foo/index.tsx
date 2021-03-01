import React from 'react';
import { useSelector, useDispatch, State } from 'mdf';

/**
 * @file foo page
 * @lazy
 */

export default function () {
  const dispatch = useDispatch();
  const { model, loading } = useSelector((state: State) => state);

  const clickHandle = () => {
    dispatch({ type: 'model/testLoading', payload: 12312312 });
  }

  // 这个 loading key 还没想好怎么定义
  // loading.effects['model/testLoading']

  return (
    <div>
      <h2>foo page -- {model.company}</h2>
      <button onClick={clickHandle}>
        { loading.effects['model/testLoading'] ? '等等...' : '修改测试' }
      </button>
    </div>
  );
}

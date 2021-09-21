import React, { useEffect } from 'react';
import { plugin, PluginType, connect, ConnectedProps, RootState } from 'mdf';
import Title from './components/title';
import './normal.less';

/**
 * @file 标准 rematch demo
 */

const mapStateToProps = ({ rematch_model }: RootState) => rematch_model;

type Props = ReturnType<typeof mapStateToProps> & ConnectedProps;

function RematchView(props: Props) {
  useEffect(() => {
    console.log('[运行时插件]', plugin.invoke({ key: 'kernal', type: PluginType.modify }));
  }, []);

  const handleClick = () => {
    const { dispatch } = props;

    // 两种 dispatch 方式
    dispatch.rematch_title.changeTitle();
    dispatch({ type: 'rematch_model/setPlayers' });
  };

  const { players } = props;

  return (
    <div>
      <Title virtual={true} />
      <button onClick={handleClick}>duang</button>
      {players.map((num: any) => (
        <p key={num}>{num}</p>
      ))}
    </div>
  );
}

export default connect(mapStateToProps, null)(RematchView);

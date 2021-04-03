import React, { useEffect } from 'react';
import { plugin, PluginType, Link, connect, ConnectProps } from 'mdf';
import styles from './home.scss?module';
import './normal.scss';

/**
 * @file user home page
 * @path /
 */

const mapStateToProps = ({ proxy }: any) => proxy;

type Props = ReturnType<typeof mapStateToProps> & ConnectProps;

const Home = function (props: Props) {
  const { name, money, beauty, dispatch } = props;

  // 触发运行时插件的执行
  useEffect(function () {
    plugin.invoke({ key: 'mdfInfo', type: PluginType.event });
  }, []);

  const checkApp = () => {
    dispatch({ type: 'proxy/checkApp' });
  };

  const addWatchVideoLog = () => {
    dispatch({ type: 'proxy/addWatchVideoLog' });
  };

  const yapiRequest = () => {
    dispatch({ type: 'proxy/yapiRequest' });
  };

  return (
    <div className={styles.home}>
      <h2>mdf-react 测试代理</h2>
      <div>
        <Link to="/foo">跳转到 foo 页面</Link>
        <p className={styles.link} onClick={yapiRequest}>
          完全匹配代理: {name}
        </p>
        <p className={styles.link} onClick={checkApp}>
          默认 server 代理 --- checkApp: {money}
        </p>
        <p className={styles.link} onClick={addWatchVideoLog}>
          特定 path 代理 --- addWatchVideoLog: {beauty}
        </p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Home);

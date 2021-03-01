import React, { useEffect } from 'react';
import { plugin, PluginType, Link, connect, ConnectProps } from 'mdf';
import styles from './home.scss?module';
import './normal.scss';

/**
 * @file user home page
 * @path /
 */

const mapStateToProps = ({ pay }: any) => pay;

type Props = ReturnType<typeof mapStateToProps> & ConnectProps;

const Home = function (props: Props) {
  const { name, money, beauty, dispatch } = props;

  // 触发运行时插件的执行
  useEffect(function() {
    plugin.invoke({
      key: 'mdfInfo',
      type: PluginType.event,
    });
  }, []);

  const changeMoneyHandle = () => {
    dispatch({ type: 'pay/addMoney' });
  };

  const changeBeautyHandle = () => {
    dispatch({ type: 'pay/addBeauty' });
  };

  const changeNameHandle = () => {
    dispatch({ type: 'pay/changeName' });
  };

  return (
    <div className={styles.home}>
      <h2>mdf-react 测试代理</h2>
      <div>
        <Link to="/foo">跳转到 foo 页面</Link>
        <p className={styles.link} onClick={changeNameHandle}>user-name: {name}</p>
        <p className={styles.link} onClick={changeMoneyHandle}>
          yapi 代理 --- user-model: {money}
        </p>
        <p className={styles.link} onClick={changeBeautyHandle}>
          server 代理 --- user-model: {beauty}
        </p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Home);

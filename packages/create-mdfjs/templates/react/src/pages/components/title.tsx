import React from 'react';
import { useSelector, RootState, connect, ConnectedProps, ConnectedReturn } from 'mdf';

/**
 * @file loading + connect type demo
 */

const mapStateToProps = ({ loading }: RootState) => ({
  // model 级别
  loading: loading.models.rematch_title,
});

type Props = ReturnType<typeof mapStateToProps> & ConnectedProps;

function Title(props: Props) {
  const titleState = useSelector((state: RootState) => state.rematch_title);

  return (
    <div className='title'>
      <h3>
        {titleState.name} {props.loading ? <span className='loading'>is loading</span> : null}
      </h3>
    </div>
  );
}

// 因为 mdf 重写了 ConnectedProps，所以只能通过定义返回类型来处理，相当于 OwnProps 定义
type ComponentType = ConnectedReturn<{ virtual: boolean }>;
export default connect(mapStateToProps, null)<ComponentType>(Title as any);

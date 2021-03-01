import React from 'react';

/**
 * @file 用户可能会有嵌套 AppElement 的需求
 */

export default class Wrapper extends React.Component {
  render() {
    return (
      <fieldset>
        <legend><h3>from wrapper.tsx</h3></legend>
        {this.props.children}
      </fieldset>
    );
  }
}

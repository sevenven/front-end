import React, { Component } from 'react';
import { Context } from '../../../Context';

export default class ContextTypePage extends Component {

  // 类组件使用contextType获取-只能的订阅单一的Context来源
  static contextType = Context;

  render() { 
    const { themeColor } = this.context
    return (
      <div>
        <h3>ContexTypePage</h3>
        <div className={themeColor}>red word</div>
      </div>
    );
  }
}
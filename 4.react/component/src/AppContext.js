import React from 'react';

export const Context = React.createContext();
export const Provider = Context.Provider; // 提供者
export const Consumer = Context.Consumer; // 消费者

// 高阶组件
export const handleConsumer = Cmp => props => {
  return (
    <Consumer>{ctx => <Cmp {...props} {...ctx} />}</Consumer>
  )
}
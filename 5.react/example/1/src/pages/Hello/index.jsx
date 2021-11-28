import { PureComponent } from 'react';
import hello from './index.module.css';
// 不太好
// 1.写法繁琐
// 2.如果是提供给别人的组件，如果有样式覆盖的需求无法实现

export default class Hello extends PureComponent {
  render () {
    console.log('this.props~~~', this.props)
    return (
      <h1 className={hello.title}>
        这是Hello的内容
      </h1>
    )
  }
}
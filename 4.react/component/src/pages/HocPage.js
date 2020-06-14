// 高阶组件：接收一个组件然后返回另一个组件的函数
import React, { Component } from 'react';

// 写法一
// const foo = Cmp => {
//   return props => {
//     return (
//       <div className="border">
//         <Cmp {...props} />
//       </div>
//     )
//   }
// }
// 写法二（更优雅）
// Cmp是function或者class组件
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  )
}

// function Child(props) {
//   return (
//     <div>Child-{props.msg}</div>
//   )
// }
@foo
class Child extends Component {
  render() {
    return (
      <div>Child-{this.props.msg}</div>
    );
  }
}

// 处理原生标签
const fooHost = element => {
  // return element;
  // return React.cloneElement(element, { className: 'border' });
  // return React.createElement(element.type, { ...element.props, className: 'border'});
  return <element.type {...element.props} className="border" />
}

class HocPage extends Component {
  render() {
    const Foo = foo(Child);
    // 链式调用
    // const Foo = foo(foo(Child));
    return (
      <div>
        <h3>HocPage</h3>
        <Foo msg="zanzan" />
        <Child msg="bobo" />
        {/* 不推荐 每次都会重新生成一个新组件 同时组件状态也会丢失 */}
        {/* {foo(Child)({ msg: 'bobo' })} */}
        {fooHost(<div>原生标签</div>)}
      </div>
    );
  }
}

export default HocPage;

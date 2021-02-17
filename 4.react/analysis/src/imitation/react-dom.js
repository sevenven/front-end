
// ReactDOM渲染函数
function render(vnode, container) {
  const node = createNode(vnode);
  container.appendChild(node);
}

// 从虚拟dom变成真实dom
function createNode(vnode) {
  let node;
  const { type } = vnode;
  if (isStringOrNumber(vnode)) { // 文本节点
    node = updateTextComponent(vnode + "");
  } else if (typeof type === "string") { // 原生标签节点
    node = updateHostCpmponent(vnode);
  } else if (typeof type === 'symbol') { // fragment节点
    node = updateFragmentComponent(vnode);
  } else if (typeof type === "function") { // 函数组件及类组件
    node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
  }
  return node; 
}

function isStringOrNumber(str) {
  return typeof str === 'string' || typeof str === 'number';
}

// 文本节点处理
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// fragment节点处理
function updateFragmentComponent(vnode) {
  const node = document.createDocumentFragment();
  reconcileChildren(node, vnode.props.children);
  return node;

}

// 原生标签节点处理
function updateHostCpmponent(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  updateNode(node, props);
  reconcileChildren(node, props.children)
  return node; 
}

// 函数组件处理
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const child = type(props);
  const node = createNode(child);
  return node;
}

// 类组件处理
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const instance = new type(props);
  const child = instance.render();
  const node = createNode(child);
  return node;
}

// 给节点添加属性
function updateNode(node, props) {
  Object.keys(props).filter(key => key !== "children").forEach(prop => node[prop] = props[prop])
}

// 遍历处理子节点
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    render(child, parentNode);
  }
}

export default {
  render
}
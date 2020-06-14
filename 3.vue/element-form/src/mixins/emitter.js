// 向上派发事件
function $dispatch (componentName, eventName, datas) {
  let parent = this.$parent || this.$root;
  let name = parent.$options.name;
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;
    if (parent) 
      name = parent.$options.name;
  }
  if (parent)
    parent.$emit.apply(parent, [eventName].concat(datas))
}

// 向下广播事件
function boardcast (componentName, eventName, datas) {
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(datas));
    } else {
      boardcast.apply(child, [componentName, eventName].concat(datas));
    }
  })
}

export default {
  methods: {
    $dispatch,
    $boardcast: function (componentName, eventName, datas) {
      boardcast.call(this, componentName, eventName, datas);
    }
  }
}
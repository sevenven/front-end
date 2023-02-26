import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";

function render(vnode, container) {
  const rootFiber = {
    type: container.nodeName.toLocaleLowerCase(),
    stateNode: container,
    props: {children: vnode},
  };

  scheduleUpdateOnFiber(rootFiber);
}

export default {render};

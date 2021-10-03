import React, { createContext, useCallback, useLayoutEffect, useState } from 'react';
import { bindActionCreators } from '../Redux';

// step1 创建context对象
const Context = createContext();

// step2 通过Provider传递value
export function Provider({store, children}) {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  )
}

// step3 子组件消费value
export const connect = (
  mapStateToProps = state => state, 
  mapDispatchToProps,
) => (WrappedComponent) => (props) => {
  const store = React.useContext(Context);
  const { getState, dispatch } = store;
  const stateProps = mapStateToProps(getState());
  let dispatchProps = {dispatch};
  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if(typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    }
  }, [store, forceUpdate])
  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

// 获取state值
export function useSelector (selector) {
  const store = React.useContext(Context);
  const { getState } = store;
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    }
  }, [store, forceUpdate]);
  const selectState = selector(getState());
  return selectState;
}

// 修改state
export function useDispatch () {
  const store = React.useContext(Context);
  return store.dispatch;
}

// forceUpdate
function useForceUpdate() {
  const [, setState] = useState(0)
  const update = useCallback(() => {
    setState(prev => prev + 1);
  }, []);
  return update;
}
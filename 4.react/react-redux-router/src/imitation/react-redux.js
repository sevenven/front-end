import React, { useState, useContext, useEffect } from 'react';

const ReduxContext = React.createContext();

export function Provider({ store, children }) {
  return <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
}

export const connect = (mapStateToProps, mapDispatchToProps) => Cmp => props => {
  const store = useContext(ReduxContext);
  const getMoreProps = () => {
    const stateProps = mapStateToProps(store.getState());
    const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
    return {
      ...stateProps,
      ...dispatchProps
    };
  };
  useEffect(() => {
    store.subscribe(() => {
      setMoreProps({
        ...moreProps,
        ...getMoreProps()
      });
    })
  });
  const [moreProps, setMoreProps] = useState(getMoreProps());
  return <Cmp {...props} {...moreProps} />
}

function bindActionCreators(actionCreators, dispatch) {
  const obj = {}
  for (let key in actionCreators) {
    obj[key] = bindActionCreator(actionCreators[key], dispatch)
  }
  return obj;
}

function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
import React from 'react';
import UseState from './components/UseState';
import UseEffect from './components/UseEffect';
import UseContext from './components/UseContext';
import UseCallBack from './components/UseCallBack';
import UseMemo from './components/UseMemo';
import UseRef from './components/UseRef';
// import UseImperativeHandle from './components/UseImperativeHandle';

export default function HooksPage(props) {

  return (
    <div>
      <h3>HooksPage</h3>
      {/* 基础Hook */}
      <UseState />
      <UseEffect />
      <UseContext />
      {/* 额外的Hook */}
      <UseCallBack />
      <UseMemo />
      <UseRef />
      {/* <UseImperativeHandle /> */}
    </div>
  )
}
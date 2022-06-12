import React from 'react';
import Basic from './components/Basic';
import UseCallBack from './components/UseCallBack';
import UseMemo from './components/UseMemo';
import UseImperativeHandle from './components/UseImperativeHandle';

export default function HooksPage(props) {

  return (
    <div>
      <h3>HooksPage</h3>
      <Basic />
      <UseCallBack />
      <UseMemo />
      <UseImperativeHandle />
    </div>
  )
}
import React from 'react';

export default function A(props) {
  console.log('component A~~~重新渲染了', props.count, props)
  return (
    <div>
      <div>component A</div>
      <div>{props.count}</div>
      <button onClick={props.addCount}>component A add</button>
    </div>
  )
}

export const MemoA = React.memo(A);

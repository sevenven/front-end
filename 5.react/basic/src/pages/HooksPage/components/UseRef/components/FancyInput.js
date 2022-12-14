import React, {
  useState,
  useRef,
  useImperativeHandle,
} from 'react';

export default React.forwardRef((props, ref) => {
  const [ fresh, setFresh ] = useState(false)
  const attRef = useRef(0);
  
  // useImperativeHandle可以让你在使用re 时自定义暴露给父组件的实例值
  // 在本例中我们只暴露了attRef和fresh
  useImperativeHandle(ref, () => ({
    attRef,
    fresh
  }), [ fresh ]);

  const handleClick = () => {
    // useRef用法2：存储变量
    attRef.current++;
  };

  return (
    <div>
      {attRef.current}
      <button onClick={handleClick}>Fancy</button>
      <button onClick={() => setFresh(!fresh)}>刷新</button>
    </div>
  )
});

import React, {
  useState,
  useRef,
  useImperativeHandle,
  useCallback
} from 'react';

export default React.forwardRef((props, ref) => {
  const [ fresh, setFresh ] = useState(false)
  const attRef = useRef(0);
  
  useImperativeHandle(ref, () => ({
    attRef,
    fresh
  }), [ fresh ]);

  const handleClick = useCallback(() => {
    // useRef用法2：存储变量
    attRef.current++;
  }, []);

  return (
    <div>
      {attRef.current}
      <button onClick={handleClick}>Fancy</button>
      <button onClick={() => setFresh(!fresh)}>刷新</button>
    </div>
  )
});

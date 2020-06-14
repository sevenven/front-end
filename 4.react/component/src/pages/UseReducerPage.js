// reducer就是一个纯函数 接收旧的state和action 返回state
// useReducer是useState的可选项，常用于组件有复杂状态逻辑时，类似于redux中reducer的概念

 import React, { useReducer, useEffect } from 'react';
import FruitList from '../components/FruitList';
import FruitAdd from '../components/FruitAdd';

 function fruitReducer(state, action) {
   switch (action.type) {
    case 'init': 
    case 'replace':
      return [...action.payload]
    case 'add':
      return [...state, action.payload]
    default: 
      return state;
   }
 }

 const UseReducerPage = () => {
   const [fruit, dispatch] = useReducer(fruitReducer, []);
   useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'init', payload: ['apple', 'banana']})
    }, 1000);
   }, []);
   return (
     <div>
       <h3>UseReducerPage</h3>
       <FruitList fruit={fruit} setFruit={(newList) => dispatch({type: 'replace', payload: newList})} />
       <FruitAdd fruit={fruit} setFruit={(newList) => dispatch({type: 'replace', payload: newList})} />
     </div>
   );
 }
  
 export default UseReducerPage;
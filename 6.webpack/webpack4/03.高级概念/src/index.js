import './css/style.css'
import './css/style1.css'
// Tree Shaking 只支持 ES Module方式的引入
// import _ from 'lodash'
/*import {add} from './js/math'

add(1, 2)*/
// console.log(_.join(['a', 'b', 'c'], '***'))*/


/*function getComponent(){
  return import(/!*webpackChunkName:"lodash"*!/'lodash').then(({default:_}) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['Bill', 'Gates'], ' ');
    return element
  })
}*/

/*document.addEventListener("click", function(){
  getComponent().then(element => {
    document.body.appendChild(element);
  })
})*/

// webpack中实现代码分割，两种方式
// 1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可
// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
//                     会对异步代码应用懒加载

document.addEventListener("click", () => {
  import(/*webpackPrefetch: true*/'./js/handleClick.js').then(({default: func}) => {
    func();
  })
})
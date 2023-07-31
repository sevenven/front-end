
import Header from './js/header'
import Sidebar from './js/sidebar'
import Content from './js/content'
import Avatar from './js/avatar'
import Counter from './js/counter'
import Number from './js/number'

import avatar from './img/avatar.jpeg'
// 需要寻找全局打包的方法
import style from './index.css'
import icon from "./css/iconfont.css";

new Header()
new Sidebar()
new Content()
new Avatar()

var root = document.getElementById('root')

var img = new Image()
img.src = avatar
// img.classList.add('avatar')
img.classList.add(style.avatar)

root.append(img)

var div = document.createElement('div')
div.classList.add(icon.iconfont)
div.classList.add(icon['icon-fangwu'])

root.append(div)

// 测试热更新
// css热更新不需要特别的写法
var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function() {
	var div = document.createElement('div');
	div.innerHTML = 'item';
  div.classList.add(style.item)
	document.body.appendChild(div);
}

new Counter();
new Number();
// JS热更新写法
if(module.hot){
	module.hot.accept('./js/number', () => {
    document.body.removeChild(document.getElementById('number'));
		// 热更新Number模块
		// 可以更改number的代码测试热更新
    new Number();
	})
}

// 测试ES6语法
const arr = [
  new Promise(() => {}),
  new Promise(() => {})
]

arr.map(item => {
  console.log(item)
})




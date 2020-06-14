
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
img.classList.add(style.avatar)

root.append(img)

var div = document.createElement('div')
div.classList.add(icon.iconfont)
div.classList.add(icon['icon-fangwu'])

root.append(div)

console.log("js又改变了");


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

if(module.hot){
	module.hot.accept('./js/number', () => {
    document.body.removeChild(document.getElementById('number'))
    new Number();
	})
}

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
]

arr.map(item => {
  console.log(item)
})




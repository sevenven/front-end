import number from './js/number';
import icons from "./css/iconfont.css";
import Beijixiong from './images/beijixiong.jpeg';
import './style.scss';

// example:code-split
/* // 同步-需要配置optimization.splitChunks.chunks = 'all'
import _ from 'lodash'
const element = document.createElement('div');
element.innerHTML = _.join(['Hello', 'webpack'], ' ');
document.body.appendChild(element); */
// 异步-默认支持-不需要任何配置
// async function getComponent1() {
// 	const element = document.createElement('div');
// 	// const { default: _ } = await import('lodash');
// 	// magic comment 魔法注释
// 	const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
// 	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
// 	return element;
// }
// getComponent1().then((component) => {
// 	document.body.appendChild(component);
// });

// example:prefetch(预获取)：将来某些导航下可能需要的资源/preload(预加载)：当前导航下可能需要资源
async function getComponent2() {
	const element = document.createElement('div');
	const { default: _ } = await import(/* webpackPrefetch: true */ 'lodash');
	// const { default: _ } = await import(/* webpackPreload: true */ 'lodash');
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	return element;
}

// example:测试热更新
// css热更新不需要特别的写法
const btn1 = document.createElement('button');
btn1.innerHTML = '新增';
document.body.appendChild(btn1);

btn1.onclick = function () {
	getComponent2().then((component) => {
		document.body.appendChild(component);
	});
}
// JS热更新写法
number();
if (module.hot) {
	module.hot.accept('./js/number', () => {
		document.body.removeChild(document.getElementById('number'));
		// 热更新number模块
		// 可以更改number的代码测试热更新
		number();
	})
}

// example:图片
const imgElement = document.createElement('div');
imgElement.className = 'tuzi';
const myBeijixiong = new Image();
myBeijixiong.src = Beijixiong;
imgElement.appendChild(myBeijixiong);
document.body.appendChild(imgElement);

// example:字体图标
var fontElement = document.createElement('div');
// fontElement.classList.add(icons.iconfont);
// fontElement.classList.add(icons['icon-fangwu']);
fontElement.classList.add('iconfont');
fontElement.classList.add('icon-fangwu');
document.body.appendChild(fontElement);



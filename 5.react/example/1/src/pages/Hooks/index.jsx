import React from 'react'
import ReactDOM from 'react-dom'

function Demo() {

	const [count, setCount] = React.useState(0)
	const myRef = React.useRef()

	React.useEffect(() => {
		let timer = setInterval(() => {
			setCount(count => {
				console.log('count1~~~', count);
				return count + 1
			})
		}, 2000)
		return () => {
			clearInterval(timer)
		}
	}, [])

	React.useEffect(() => {
		console.log('count2~~~', count);
	}, [count])

	//加的回调
	function add() {
		//setCount(count+1) //第一种写法
		setCount(count => count + 1)
	}

	//提示输入的回调
	function show() {
		alert(myRef.current.value)
	}

	//卸载组件的回调
	function unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	return (
		<div>
			<input type="text" ref={myRef} />
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
			<button onClick={show}>点我提示数据</button>
		</div>
	)
}

export default Demo

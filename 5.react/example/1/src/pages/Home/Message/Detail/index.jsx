import React, { Component } from 'react'
// import qs from 'querystring'

const DetailData = [
	{ id: '01', content: '你好，xiaozhan' },
	{ id: '02', content: '你好，wangyibo' },
	{ id: '03', content: 'suoer' }
]
export default class Detail extends Component {
	render() {
		/* // 接收params参数
		const { id, title } = this.props.match.params */

		/* // 接收search参数
		const { search } = this.props.location
		const { id, title } = qs.parse(search.slice(1)) */

		// 接收state参数
		const { id, title } = this.props.location.state || {}

		const findResult = DetailData.find((detailObj) => detailObj.id === id)

		return (
			<ul>
				<li>ID&ensp;:&ensp;{id}</li>
				<li>TITLE&ensp;:&ensp;{title}</li>
				<li>CONTENT&ensp;:&ensp;{findResult && findResult.content}</li>
			</ul>
		)
	}
}

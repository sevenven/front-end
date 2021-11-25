import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {

  state = {
    users: [], // users初始值为数组
    isFirst: true, // 是否为第一次打开页面
    isLoading: false,// 标识是否处于加载中
    err: '',// 存储请求相关的错误信息
  }

  componentDidMount() {
    this.token = PubSub.subscribe('search', (_, data) => {
      this.setState(data)
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {
          isFirst ? <h2>&ensp;欢迎使用，输入关键字，随后点击搜索</h2> :
            isLoading ? <h2>&ensp;Loading......</h2> :
              err ? <h2 style={{ color: 'red' }}>&ensp;{err}</h2> :
                users.map(item => {
                  return (
                    <div className="card" key={item.id}>
                      <a href={item.html_url} target="_blank" rel="noreferrer">
                        <img src={item.avatar_url} alt="avatar" style={{ width: '100px' }} />
                      </a>
                      <p className="card-text">{item.login}</p>
                    </div>
                  )
                })
        }
      </div>
    )
  }
}

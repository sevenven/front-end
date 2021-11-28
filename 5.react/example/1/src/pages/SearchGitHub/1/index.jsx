import React, { Component } from 'react'
import Search from './Search'
import List from './List'
export default class SearchGitHub extends Component {

  state = {
    users: [], // users初始值为数组
    isFirst: true, // 是否为第一次打开页面
    isLoading: false,// 标识是否处于加载中
    err: '',// 存储请求相关的错误信息
  }

  updateSearchState = (state) => {
    this.setState(state)
  }

  render() {
    return (
      <div className="search">
        <div className="container">
          <Search updateSearchState={this.updateSearchState} />
          <List {...this.state} />
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

  search = () => {
    const { value: keyWord } = this.keyWordNode;
    this.props.updateSearchState({ isLoading: true, isFirst: false })
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      response => {
        //请求成功后通知App更新状态
        this.props.updateSearchState({ isLoading: false, users: response.data.items })
      },
      error => {
        //请求失败后通知App更新状态
        this.props.updateSearchState({ isLoading: false, err: error.message })
      }
    )
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索Github用户</h3>
        <div>
          <input ref={c => this.keyWordNode = c} type="text" placeholder="输入关键词点击搜索" />&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}

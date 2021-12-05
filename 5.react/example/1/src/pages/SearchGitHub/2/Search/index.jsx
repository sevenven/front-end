import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  search = () => {
    const { value: keyWord } = this.keyWordNode;
    PubSub.publish('search', { isLoading: true, isFirst: false })
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      response => {
        //请求成功后通知App更新状态
        PubSub.publish('search', { isLoading: false, users: response.data.items })
      },
      error => {
        //请求失败后通知App更新状态
        PubSub.publish('search', { isLoading: false, err: error.message })
      }
    )
  }

  render() {
    return (
      <section className="jumbotron" style={{paddingLeft: '24px'}}>
        <h3 className="jumbotron-heading">搜索Github用户</h3>
        <div>
          <input ref={c => this.keyWordNode = c} type="text" placeholder="输入关键词点击搜索" />&emsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}

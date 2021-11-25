import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  search = async () => {
    const { value: keyWord } = this.keyWordNode;
    PubSub.publish('search', { isLoading: true, isFirst: false })
    /* fetch(`/api1/search/users?q=${keyWord}`).then(
      response => {
        console.log('联系服务器成功了', response.json());
        return response.json()
      },
      // error => {
      //   console.log('联系服务器失败了', error);
      //   return new Promise(() => { })
      // }
    ).then(
      response => {
        PubSub.publish('search', { isLoading: false, users: response.items })
      },
      // error => { console.log('获取数据失败了', error); }
    ).catch((error) => {
      console.log('请求出错', error);
      PubSub.publish('search', { isLoading: false, err: error.message })
    }) */
    try {
      const response = await fetch(`/api1/search/users?q=${keyWord}`)
      const data = await response.json()
      PubSub.publish('search', { isLoading: false, users: data.items })
    } catch (error) {
      console.log('请求出错', error);
      PubSub.publish('search', { isLoading: false, err: error.message })
    }
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

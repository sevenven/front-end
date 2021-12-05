import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  search = async () => {
    const { value: keyWord } = this.keyWordNode;
    PubSub.publish('search', { isLoading: true, isFirst: false })
    /* fetch(`/api1/search/users2?q=${keyWord}`).then(
      response => {
        if (response.status === 200) {
          return response.json()
        } else {
          response.message = response.statusText;
          return Promise.reject(response)
        }
      },
    ).then(
      response => {
        PubSub.publish('search', { isLoading: false, users: response.items })
      },
    ).catch((error) => {
      PubSub.publish('search', { isLoading: false, err: error.message })
    }) */
    try {
      const response = await fetch(`/api1/search/users2?q=${keyWord}`)
      if (response.status === 200) {
        const data = await response.json()
        PubSub.publish('search', { isLoading: false, users: data.items })
      } else {
        response.message = response.statusText;
        throw response
      }
    } catch (error) {
      PubSub.publish('search', { isLoading: false, err: error.message })
    }
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

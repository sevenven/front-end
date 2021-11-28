import React, { Component } from 'react'
import Search from './Search'
import List from './List'
export default class SearchGitHub extends Component {

  render() {
    return (
      <div className="search">
        <div className="col-xs-15">
          <Search />
          <List />
        </div>
      </div>
    )
  }
}

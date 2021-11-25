import React, { Component } from 'react'
import Search from './Search'
import List from './List'
import '../../../assets/css/bootstrap.css'

export default class SearchGitHub extends Component {

  render() {
    return (
      <div className="search">
        <div className="container">
          <Search />
          <List />
        </div>
      </div>
    )
  }
}

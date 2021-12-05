import React, { Component } from 'react'
import Count from './Count'
import Person from './Person'
import store from '../../redux/store'
import { Provider } from 'react-redux'

export default class ReactRedux extends Component {
  render() {
    return (
      <Provider store={store}>
        <Count />
        <br/><hr/>
        <Person />
      </Provider>
    )
  }
}

import React, { Component } from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

export default class Switch extends Component {
  render() { 
    return (
      <RouterContext.Consumer>
        {
          context => {
            let match;
            let element;
            React.Children.forEach(this.props.children, child => {
              if (match == null) {
                match = child.props.path ? matchPath(context.location.pathname, child.props) : context.match
                element = child;
              }
            })
            return match ? React.cloneElement(element, {computedMatch: match}) : null
          }
        }
      </RouterContext.Consumer>
    );
  }
}

import React, { Component } from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export default class Route extends Component {
  render() {
    const { computedMatch, path, children, component, render } = this.props;
    return (
      <RouterContext.Consumer>
        {
          context => {
            // const match = path === context.location.pathname;
            const match = computedMatch ? computedMatch : path ? matchPath(context.location.pathname, this.props) : context.match;
            const props = { ...context, match };
            return match ?
              children ?
                typeof children === 'function' ? children(props)
                  : children
                : component ?
                  React.createElement(component, props)
                  : render ?
                    render(props)
                    : null
              : typeof children === 'function' ?
                children(props)
                : null
          }
        }
      </RouterContext.Consumer>
    )
  }
}

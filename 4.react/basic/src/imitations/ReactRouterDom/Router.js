import React, { Component } from 'react';
import RouterContext from './RouterContext';

export default class Router extends Component {

  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }

  constructor(props) {

    super(props);

    this.state = {
      location: props.history.location
    }

    this.unlisten = props.history.listen(location => {
      this.setState({
        location
      });
    })
    
  }
  
  componentWillUnmount() {
    this.unlisten();
  }

  render() { 
    const { history } = this.props;
    const { location } = this.state;
    return (
      <RouterContext.Provider value={{ 
        history, 
        location,
        match: Router.computeRootMatch(this.state.location.pathname)
      }}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}

import RouterContext from "./RouterContext";

const widthRouter = WrappedComponent => props => {
  return <RouterContext.Consumer>
    {
      context => {
        return <WrappedComponent {...props} {...context} />
      }
    }
  </RouterContext.Consumer>
}

export default widthRouter;
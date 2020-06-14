import React, { Component } from 'react';
import { handleConsumer } from '../AppContext';
import Layout from './Layout';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    // console.log('homePage: ', this.props);
    const HandleConsumer = handleConsumer(HomeHandle);
    return (
      <Layout showTopBar={true} title="首页">
        <div>
          <h3>HomePage</h3>
          {/* <Consumer>{ctx => <HomeHandle {...ctx} />}</Consumer> */}
          <HandleConsumer />
        </div>
      </Layout>
    );
  }
}

const HomeHandle = (props) => {
  return (
    <div>HandleConsumer-{props.user.name}</div>
  );
}

export default HomePage;
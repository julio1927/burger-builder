import React, { Component } from 'react';
import Layout from './components/Layout';
import BugerBuilder from './containers/BugerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BugerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;

/*
    ==========================================================================================
    File: App.js
    Project: Burger Builder App
    Programmer: Julio Rivas 
    Date: August 31 2020
    Description: The purpose of this applcation is to create a burger building app. The user 
                 will be allowed to pick the ingredients they want and a price will be shown
                 depending on the ingredients. Lastly the user will be able to see their 
                 orders. 
    ==========================================================================================
*/

import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BugerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BugerBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;

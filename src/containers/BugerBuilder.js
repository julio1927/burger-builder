/*
	=========================================================
	File: BurgerBuilder.js
	Date: September 01 2020
    Description: The purpose of this stateful component is to
                 build a dynamically created burger.
	=========================================================
*/


import React, { Component } from 'react';
import Aux from '../hoc/Aux';

import Burger from '../components/Burger/Burger';

class BugerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BugerBuilder;
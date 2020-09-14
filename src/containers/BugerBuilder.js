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
import BuildControls from '../components/Burger/BuildControls/BuildControls';

// dollar prices of ingredients 
const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}

class BugerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 3
    }

    addIngridentHandler = (type) => {
        //updating ingredients 
        const oldCountOfIngrident = this.state.ingredients[type];
        const updatedCount = oldCountOfIngrident + 1; 
        
        const updatedIngridents = {
            ...this.state.ingredients
        };
        updatedIngridents[type] = updatedCount;

        //updating price 
        const addPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addPrice;

        this.setState({totalPrice: newPrice, ingredients: updatedIngridents});
    }

    removeIngridentHandler = (type) => {
        //updating ingredients 
        const oldCountOfIngrident = this.state.ingredients[type];

        // checking removing of an ingredient that has 0
        if(oldCountOfIngrident <= 0){
            return;
        }

        const updatedCount = oldCountOfIngrident - 1; 
        
        const updatedIngridents = {
            ...this.state.ingredients
        };
        updatedIngridents[type] = updatedCount;

        //updating price 
        const deductPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductPrice;

        this.setState({totalPrice: newPrice, ingredients: updatedIngridents});
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngridentHandler}
                    removeIngredient={this.removeIngridentHandler}
                    disabled={disabledInfo} />
            </Aux>
        );
    }
}

export default BugerBuilder;
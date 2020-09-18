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
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 3,
        purchasable: false,
        purchasing: false
    }


    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
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
        this.updatePurchaseState(updatedIngridents);
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
        this.updatePurchaseState(updatedIngridents);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Continued');
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // Modal should only show when purchasing is true 
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}> 
                    <OrderSummary 
                        purchaseCancelled={this.purchaseCancelHandler}
                        price={this.state.totalPrice}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngridentHandler}
                    removeIngredient={this.removeIngridentHandler}
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BugerBuilder;
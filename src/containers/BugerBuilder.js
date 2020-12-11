/*
	=========================================================
	File: BurgerBuilder.js
	Date: September 01 2020
    Description: The purpose of this stateful component is to
                 build a dynamically created burger.
	=========================================================
*/


import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';

import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../../src/axios-order';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

// dollar prices of ingredients 
const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}

class BugerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 3,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // fetching ingredients from firebase db 
    componentDidMount () {
        axios.get('https://react-my-bugerbuilder.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState( {ingredients: response.data} );
        })
        .catch(error => {
            this.setState({error: true});
        });
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
        //alert('Continued');

        const query = [];

        for(let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        query.push('price='+ this.state.totalPrice);

        const queryStr = query.join('&');

        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryStr
        });
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        // if no ingredients (waiting for GET HTTP request to fetch data from firebase)
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        // if there are ingredients display UI
        if(this.state.ingredients) {
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary 
                            purchaseCancelled={this.purchaseCancelHandler}
                            price={this.state.totalPrice}
                            purchaseContinued={this.purchaseContinueHandler}
                            ingredients={this.state.ingredients}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        // Modal should only show when purchasing is true 
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BugerBuilder, axios);
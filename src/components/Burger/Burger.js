/*
	=========================================================
	File: Burger.js
	Date: September 01 2020
    Description: The purpose of this component is to build 
                 a burger.
	=========================================================
*/

import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => { 

    // Mapping object into an array of ingredients. Lets me know how many ingredients I need and what ingredients I need 
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />;
        }); 
    }).reduce((arr,el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0){
        transformedIngredients = <p> Please start adding ingredients! </p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
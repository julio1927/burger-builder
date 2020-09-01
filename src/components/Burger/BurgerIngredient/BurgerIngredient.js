/*
    File: BurgerIngredient.js
    Date: September 01 2020
    Description: The purpose of this component is to return the corresponding JSX code 
                 with the applied css class, depending on the ingredient the user wants.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';


import classes from './BurgerIngredient.css';


class BurgerIngredient extends Component {
    render () {

        let ingredient = null;

        switch (this.props.type) {
    
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            
            case ('lettuce'):
                ingredient = <div className={classes.Lettuce}></div>;
                break;
            
            case ('bacon'):
               ingredient = <div className={classes.Bacon}></div>;
               break;
            
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

// Prop type validation, making it a string and required 
BurgerIngredient.PropTypes = {
    type: PropTypes.string.isRequired
};


export default BurgerIngredient;
/*
	=========================================================
	File: CheckoutSummary.js
	Date: December 02 2020
    Description: The purpose of this stateful component is to
                 display the users checkout summary which,
                 will include the buger they built and 
                 proceeding workflows.
	=========================================================
*/

import React from 'react';

//Components 
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

//Css for component 
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>

            <Button 
                btnType="Danger" clicked={props.checkoutCancelled}>Cancel
            </Button>

            <Button 
                btnType="Success" clicked={props.checkoutContinued}>Continue
            </Button>
        </div>
    );
}

export default checkoutSummary;
import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {  label: 'Lettuce', type: 'lettuce'},
    {  label: 'Bacon', type: 'bacon'},
    {  label: 'Cheese', type: 'cheese'},
    {  label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map( ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                moreBtn={() => props.ingredientAdded(ctrl.type)}
                lessBtn={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}

        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}>Order Now
        </button>
    </div>
);

export default buildControls;
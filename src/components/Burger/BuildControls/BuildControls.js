import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            ingredientLabel={ctrl.label}
            addedIngredient = {() => props.ingredientAdded(ctrl.type)}
            subtractionIngredient = {() => props.ingredientSubtraction(ctrl.type)}
            disabled = {props.disabled[ctrl.type]}
            />
        ))}
        <button 
        onClick = {props.order}
        disabled={props.purchasable}>ORDER NOW</button>        
    </div>    
);

buildControls.prototype = {
    price: PropTypes.number,
    type: PropTypes.string
} 

export default buildControls;
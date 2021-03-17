import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.ingredientLabel}</div>
        <button onClick={props.subtractionIngredient} disabled={props.disabled}>Less</button>
        <button onClick={props.addedIngredient}>More</button>
    </div>
);

export default buildControl;
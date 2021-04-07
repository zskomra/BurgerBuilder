import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span key={ingredient.name}>
            {ingredient.name}({ingredient.amount}) </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: {props.price} zł</p>
        </div>
    );
}

export default order;
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientsKey => {
        return [...Array(props.ingredients[ingredientsKey])].map((_,i) => {
        return <BurgerIngredient key={ingredientsKey + i} type={ingredientsKey} />
        });
    }).reduce((arr, newArr) => {
        return arr.concat(newArr) 
    }, []);
    
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients</p>;
    }
    console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />            
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    ); 
};

export default burger;







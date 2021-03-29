import React from 'react';
import classes from './Order.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Some Ingredients</p>
            <p>Price: 2000 zł</p>
        </div>
    );
}

export default order;
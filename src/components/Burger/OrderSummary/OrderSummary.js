import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return <li key={ingredientKey}>{ingredientKey}: {props.ingredients[ingredientKey]}</li>
           });


    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.continue} buttonType="Positive">Continue</Button>
            <Button clicked={props.canceled} buttonType="Negative">Cancel</Button>
        </Auxiliary>
    )
}

export default orderSummary;
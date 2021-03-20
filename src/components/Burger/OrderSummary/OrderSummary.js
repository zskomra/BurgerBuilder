import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component  {
    componentDidUpdate() {
        console.log('[OrderSummary] componentDidUpdate')
    };

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingredientKey => {
            return <li key={ingredientKey}>{ingredientKey}: {this.props.ingredients[ingredientKey]}</li>
           });


    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={this.props.continue} buttonType="Positive">Continue</Button>
            <Button clicked={this.props.canceled} buttonType="Negative">Cancel</Button>
        </Auxiliary>
    )
}
}

export default OrderSummary;
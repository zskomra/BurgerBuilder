import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 3,
    bacon: 2,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {          
            meat: 0,
            salad: 0,
            cheese: 0,
            bacon: 0,          
        },
        totalPrice: 5
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    };

    removeIngredientHandler = (type) => {

    }

    render () {

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}/>
            </Auxiliary>
        );
    }

}

export default BurgerBuilder;
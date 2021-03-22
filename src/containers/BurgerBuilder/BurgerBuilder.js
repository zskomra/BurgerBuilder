import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 3.5,
    bacon: 2.3,
    paprika: 1.2,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {          
            meat: 0,
            salad: 0,
            cheese: 0,
            bacon: 0,
            paprika: 0          
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
           const sum = Object.keys(ingredients)
            .map(ingredientsKey => {
                return ingredients[ingredientsKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable : sum>0});
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
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount<1) {
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHanlder = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHanlder = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        // alert('Proccessing Order');
        this.setState({loading : true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Jan Kowalski',
                address: {
                    street: 'Somestreet 22',
                    zipCode: '87-100',
                    country: 'Poland'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState( {loading : false, purchasing: false})
        } )
            
        .catch(error => this.setState( {loading : false}));

    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0
        }
        //{salad: true, meat: false etc}
        console.log(this.state.purchasable);
        
        let orderSummary = <OrderSummary
        ingredients = {this.state.ingredients}
        canceled = {this.purchaseCancelHanlder}
        continue = {this.purchaseContinueHandler}
        totalPrice = {this.state.totalPrice}
        />

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHanlder}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientSubtraction = {this.removeIngredientHandler}
                    disabled = {disableInfo}
                    price = {this.state.totalPrice}
                    purchasable = {!this.state.purchasable}
                    order = {this.purchaseHanlder}
                />
            </Auxiliary>
        );
    }

}

export default BurgerBuilder;
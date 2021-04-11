import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions';
import {connect} from 'react-redux';
 

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 3.5,
    bacon: 2.3,
    paprika: 1.2,
}

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    // componentDidMount () {
    //     axios.get('https://react-food-app-69573-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients : response.data});
    //             console.log(response)
    //         })
    //         .catch(error => this.setState({error : true}));
    // }

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
        const priceAddition = INGREDIENT_PRICES[type];
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
        const priceSubtraction = INGREDIENT_PRICES[type];
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString});
    }
    
    render () {
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0
        }
        //{salad: true, meat: false etc}
        console.log(this.state.purchasable);
        
        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p>
        : <Spinner />;
        
        let orderSummary = null;
        if(this.props.ingredients) {
            
            burger = (
            <Auxiliary>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    // ingredientAdded = {this.addIngredientHandler}
                    ingredientAdded = {this.props.onAddIngredients}
                    ingredientSubtraction = {this.props.onRemoveIngredient}
                    disabled = {disableInfo}
                    price = {this.props.totalPrice}
                    purchasable = {!this.state.purchasable}
                    order = {this.purchaseHanlder}
                />
            </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients = {this.props.ingredients}
                canceled = {this.purchaseCancelHanlder}
                continue = {this.purchaseContinueHandler}
                totalPrice = {this.props.totalPrice}
            />
        }      

        if(this.state.loading) {
            orderSummary = <Spinner />
            
        }

        return (
            
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHanlder}>
                    {orderSummary}
                </Modal>
                    {burger}
                
            </Auxiliary>
        );
    }

}

const mapStateToProps = state =>{
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingType) => dispatch({type: actionType.ADD_INGREDIENTS, ingredientType: ingType}),
        onRemoveIngredient: (ingType) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientType: ingType})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuilder, axios));
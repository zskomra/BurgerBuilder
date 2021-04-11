import { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from "react-redux";

class Checkout extends Component {   

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     console.log(this.state.ingredients);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()) {
    //         if(param[0] === 'price') {
    //             price= param[1];
    //         }
    //         else {
    //         ingredients[param[0]] =+ param[1];
    //         }
    //     }
    //     this.setState({ingredients : ingredients,
    //     totalPrice : price})
    // }

    checkoutContiuneHanlder = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    

    render () {
        return (
            <div>
                
                <CheckoutSummary 
                    checkoutContiune={this.checkoutContiuneHanlder}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    ingredients={this.props.ingredients} />
                <Route 
                    path={this.props.match.path + '/contact-data'}                                                              
                    component={ContactData} />                     
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients
    }
}


export default connect(mapStateToProps)(Checkout);
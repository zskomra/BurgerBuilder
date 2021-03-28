import { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
    ingredients : {
            salad: 1,
            bacon:1 ,
            paprika: 1,
            cheese: 1
        }
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        console.log(this.state.ingredients);
        const ingredients = {};
        for(let param of query.entries()) {
            ingredients[param[0]] =+ param[1];
        }
        this.setState({ingredients : ingredients})
    }

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
                ingredients={this.state.ingredients} />
            </div>
        )
    }

}

export default Checkout;
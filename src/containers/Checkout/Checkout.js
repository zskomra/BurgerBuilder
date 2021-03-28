import { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
    fakeIngredients : {
            salad: 1,
            bacon:1 ,
            paprika: 1,
            cheese: 1
        }
    }
    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.fakeIngredients} />
            </div>
        )
    }

}

export default Checkout;
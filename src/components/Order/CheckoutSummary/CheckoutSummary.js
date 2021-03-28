import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope it was goooood</h1>
            <div >
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button buttonType="Positive"
                clicked={props.checkoutContiune}
            >Continue
            </Button>
            <Button buttonType="Negative"
                clicked={props.checkoutCancelled}
            >Cancel
            </Button>  
        </div>
    )
}

export default checkoutSummary;
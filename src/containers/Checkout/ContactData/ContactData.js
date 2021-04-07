import React from 'react';
import {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            }
        },
        loading: false,
    }

    orderHanlder = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState( {loading : false})
            this.props.history.push('/');
        } )            
        .catch(error => this.setState( {loading : false}));
    }

    render() {
        let form = (
            <form>
                    <Input elementType="" elementConfig="" value=""/>
                    <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                    <Input inputtype="input" type="text" name="street" placeholder="Street" />
                    <Input inputtype="input" type="text" name="postal" placeholder="Postal" />
                    <Button buttonType="Positive" clicked={this.orderHanlder}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form =<Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Entre your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;
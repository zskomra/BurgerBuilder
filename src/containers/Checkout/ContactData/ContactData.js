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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHanlder = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            dataForm: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState( {loading : false})
            this.props.history.push('/');
        } )            
        .catch(error => this.setState( {loading : false}));
    }

    inputChangeHanlder = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm : updatedOrderForm, formIsValid : formIsValid});
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHanlder}>
                    {formElementsArray.map(formElement =>(
                        <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            invalid = {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched = {formElement.config.touched}
                            value={formElement.config.value}
                            change={(event) => this.inputChangeHanlder(event, formElement.id)}
                        />
                    )
                        )
                    }
                    <Button buttonType="Positive" disabled={!this.state.formIsValid}>ORDER</Button>
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
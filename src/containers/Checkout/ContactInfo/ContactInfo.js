import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux'

import styleClasses from './ContactInfo.module.css';
import Button from '../../../components/UI/Button/Button';
import FormInput from '../../../components/UI/FormInput/FormInput';
import Spinner from '../../../components/UI/Spinner/Spinner';


export class ContactInfo extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Name',
        },
        value: '',
        touched: false,
        validation: {
          required: true,
        },
        isValid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Street',
        },
        value:'',
        touched: false,
        validation: {
          required: true,
        },
        isValid: false,
      },
      number: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          label: 'Number',
        },
        value: '',
        touched: false,
        validation: {
          required: true,
        },
        isValid: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Zip code',
        },
        value: '',
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isValid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Country',
        },
        value: '',
        touched: false,
        validation: {
          required: true,
        },
        isValid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          label: 'Email',
        },
        value: '',
        touched: false,
        validation: {
          required: true,
          pattern: 'email',
        },
        isValid: false,
      }, 
      shippingType: {
        elementType: 'dropdown',
        elementConfig: {
          options: [
            {
              value: 'onSite',
              displayValue: 'On Site',
            },
            {
              value: 'delivery',
              displayValue: 'Delivery',
            },
            {
              value: 'pickup',
              displayValue: 'Pick up',
            },
          ],
        },
        value: 'onSite',
        validation: {},
        isValid: true,
      },
    },
    formIsValid: false,
    loading: false,
  }

  orderHandler = (ev) => {
    // We prevent the submit so page doesn't reload and lose state
    ev.preventDefault();
        this.setState({isLoading: true});
        const formData = {};

        // extract name of element and value from state
        for (const formElementName in this.state.orderForm) {
          formData[formElementName] = this.state.orderForm[formElementName].value;
        }
    // append .json extension to route for firebase to work
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    axios.post('/orders.json', order)
      .then(response => {
          this.setState({ isLoading: false });
          this.props.history.push('/');
        })
      .catch(error => {
        this.setState({ isLoading: false });
      });

  }

  checkValidity = (value, rules) => {
    let isValid = true;
    const pattern = {
      email: /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+$/,
    }

    if(!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    if (rules.pattern) {
      isValid = pattern[rules.pattern].test(value.trim().toLowerCase()) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    }
    // Deep clone of input Object
    const updatedFormElement = {
      ...updatedOrderForm[inputId],
    }
    let formIsValid = true;

    // Update values and state
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputId] = updatedFormElement;

    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid,
    });
  }

  render() {
    const formElementsArray = [];

    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = ( 
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <FormInput 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.elementConfig.label}
            invalid={!formElement.config.isValid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            id={formElement.id}
            key ={formElement.id}
            changed={(ev) => this.inputChangedHandler(ev, formElement.id)}
          />
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner/>
    }

    return (
      <div className={styleClasses.ContactInfo}>
        <h4> Enter your contact info</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}

export default connect(mapStateToProps)(ContactInfo);

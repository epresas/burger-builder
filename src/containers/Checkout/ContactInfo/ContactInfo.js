import React, { useState } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux'

import styleClasses from './ContactInfo.module.css';
import Button from '../../../components/UI/Button/Button';
import FormInput from '../../../components/UI/FormInput/FormInput';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import * as utilities from '../../../shared/utilities';


const ContactInfo = props => {
  const [orderForm, setOrderForm] = useState({
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
  });

  const [formIsValid, setFormIsValid] = useState(false);


  const orderHandler = (ev) => {
    // We prevent the submit so page doesn't reload and lose state
    ev.preventDefault();

        const formData = {};

        // extract name of element and value from state
        for (const formElementName in orderForm) {
          formData[formElementName] = orderForm[formElementName].value;
        }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    const token = props.token;

    props.onOrderBurger(order, token)
  }

  const inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...orderForm,
    }
    // Deep clone of input Object
    const updatedFormElement = {
      ...updatedOrderForm[inputId],
    }
    let formIsValid = true;

    // Update values and state
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.isValid = utilities.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputId] = updatedFormElement;

    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  }

    const formElementsArray = [];

    for (const key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      });
    }
    let form = ( 
      <form onSubmit={orderHandler}>
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
            changed={(ev) => inputChangedHandler(ev, formElement.id)}
          />
        ))}
        <Button btnType='Success' disabled={!formIsValid} clicked={orderHandler}>ORDER</Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner/>
    }

    return (
      <div className={styleClasses.ContactInfo}>
        <h4> Enter your contact info</h4>
        {form}
      </div>
    )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.initPurchaseProcess(orderData, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInfo, axios));

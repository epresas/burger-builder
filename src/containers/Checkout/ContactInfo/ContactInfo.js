import React, { Component } from 'react';
import axios from '../../../axios-orders';

import styleClasses from './ContactInfo.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';


export class ContactInfo extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (ev) => {
    // We prevent the submit so page doesn't reload and lose state
    ev.preventDefault();
        // this.setState({isLoading: true});
    // append .json extension to route for firebase to work
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Edmundo Presas',
        address: {
          street: 'Test street',
          number: '4',
          zipCode: '28100',
          country: 'Spain',
        },
        email: 'test@test.com',
      },
      shippingType: 'delivery',
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

  render() {
    let form = ( 
      <form>
        <div className={styleClasses.InputGroup}>
          <input className={styleClasses.Input} type="text" id="name" name="name"></input>
          <label className={styleClasses.Label} htmlFor="name">Name</label>
        </div>
        <div className={styleClasses.InputGroup}>
          <input className={styleClasses.Input} type="email" id="email" name="email" ></input>
          <label className={styleClasses.Label} htmlFor="email">Email</label>
        </div>
        <div className={styleClasses.InputGroup}>
          <input className={styleClasses.Input} type="text" id="street" name="street" ></input>
          <label className={styleClasses.Label} htmlFor="street">Street</label>
        </div>
        <div className={styleClasses.InputGroup}>
          <input className={styleClasses.Input} type="text"  name="postalCode"></input>
          <label className={styleClasses.Label} htmlFor="postalCode">Postal code</label>
        </div>
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
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

export default ContactInfo

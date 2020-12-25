import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Auth.module.css'
import FormInput from '../../components/UI/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index';
import * as utilities from '../../shared/utilities';

export class Auth extends Component {
  state= {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          label: 'Password',
        },
        value: '',
        touched: false,
        validation: {
          required: true,
          minLenght: 6,
          pattern: 'password',
        },
        isValid: false,
      },
    },
    isSignUpMode: true,
  };

  componentDidMount () {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, inputId) => {
    const updatedControls = {
      ...this.state.controls,
      [inputId]: {
        ...this.state.controls[inputId],
        value: event.target.value,
        isValid: utilities.checkValidity(event.target.value, this.state.controls[inputId].validation),
        touched: true,
      },
    }

    this.setState({
      controls: updatedControls,
    });
  }
  
  loginHandler = (event)  => {
    event.preventDefault();
    
    const email = this.state.controls.email.value;
    const pass = this.state.controls.password.value;
    const isSignUpMode = this.state.isSignUpMode;

    this.props.onLogin(email, pass, isSignUpMode);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUpMode: !prevState.isSignUpMode }
    });
  }

  render() {
    const formElements = [];
    for (const key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key],
      })
    };

    let form = (
      <form onSubmit={this.loginHandler}>
        {formElements.map(formElement => <FormInput
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
        />)}
        <Button btnType='Success'>SUBMIT</Button>
      </form>
    )

    if (this.props.loading) {
      form = <Spinner/>;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const loginLabel = 'Registered? Log in';
    const signupLabel = 'Not registered? Sign up';

    if (this.props.isAuthenticated) {
      return <Redirect to ={this.props.authRedirectPath}/>
    }
    return (
      <div className={styles.Auth}>
        <p>{this.state.isSignUpMode ? 'Register' : 'Log in'}</p>
        {form}
        {errorMessage}
        <Button 
          btnType='Danger'
          clicked={this.switchAuthModeHandler}
        >{this.state.isSignUpMode ? loginLabel : signupLabel}</Button> 
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  error: state.authReducer.error,
  isAuthenticated: state.authReducer.token !== null,
  building: state.burgerBuilderReducer.building,
  authRedirectPath: state.authReducer.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password, isSignUpMode) => dispatch(actions.login( email, password, isSignUpMode )),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));

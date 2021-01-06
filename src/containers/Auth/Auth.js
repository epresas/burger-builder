import React, { useState, useEffect } from 'react';
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

const Auth = props => {
  const [controls, setControls] = useState({
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
  });

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const { building, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!building && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [building, authRedirectPath, onSetAuthRedirectPath]);


  const inputChangedHandler = (event, inputId) => {
    const updatedControls = {
      ...controls,
      [inputId]: {
        ...controls[inputId],
        value: event.target.value,
        isValid: utilities.checkValidity(event.target.value, controls[inputId].validation),
        touched: true,
      },
    }
    setControls(updatedControls);
  }
  
  const loginHandler = (event)  => {
    event.preventDefault();
    
    const email = controls.email.value;
    const pass = controls.password.value;

    props.onLogin(email, pass, isSignUpMode);
  }

  const switchAuthModeHandler = () => {
    setIsSignUpMode(!isSignUpMode);
  }


  const formElements = [];
  for (const key in controls) {
    formElements.push({
      id: key,
      config: controls[key],
    })
  };

  let form = (
    <form onSubmit={loginHandler}>
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
        changed={(ev) => inputChangedHandler(ev, formElement.id)}
      />)}
      <Button btnType='Success'>SUBMIT</Button>
    </form>
  )

  if (props.loading) {
    form = <Spinner/>;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  const loginLabel = 'Registered? Log in';
  const signupLabel = 'Not registered? Sign up';

  if (props.isAuthenticated) {
    return <Redirect to ={props.authRedirectPath}/>
  }
  return (
    <div className={styles.Auth}>
      <p>{isSignUpMode ? 'Register' : 'Log in'}</p>
      {form}
      {errorMessage}
      <Button 
        btnType='Danger'
        clicked={switchAuthModeHandler}
      >{isSignUpMode ? loginLabel : signupLabel}</Button> 
    </div>
  )

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

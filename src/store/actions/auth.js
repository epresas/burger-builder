import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loginSuccess = ({ idToken, localId: userId }) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    idToken,
    userId,
  };
}

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error,
  };
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT }
};

export const checkAuthTimeout = (expirationTime) => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
}

export const loginStart = () => ({ type: actionTypes.LOGIN_START });

export const login = (email, password, isSignUpMode) => dispatch => {
  dispatch(loginStart());
  const loginData = {
    email,
    password,
    returnSecureToken: true,
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCG7qJvBNoPBGrk76Cp7WUTVwOA5B1Pdso';

  if (isSignUpMode) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCG7qJvBNoPBGrk76Cp7WUTVwOA5B1Pdso';
  }
  axios.post(url, loginData)
    .then(response => {
      const expirationDate = new Date(new Date().getTime()) + response.data.expiresIn * 1000;
      localStorage.setItem('token',response.data.idToken);
      localStorage.setItem('expirationDate',expirationDate);
      localStorage.setItem('userId',response.data.localId);
      dispatch(loginSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(error => dispatch(loginFailed(error.response.data.error)));
};

export const setAuthRedirectPath = (path) => ({ 
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout())
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate <= new Date()) {
      dispatch(logout())
    } else {
      const userId = localStorage.getItem('userId')
      dispatch(loginSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
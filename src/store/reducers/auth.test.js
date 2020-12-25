import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth redux reducer', () => {
  test('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/',
      })
  });

  test('should store the token after login', () => {
      expect(reducer({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
      }, 
      {
        type: actionTypes.LOGIN_SUCCESS,
        idToken: 'test-token',
        userId: 'test-userId',
      })).toEqual({
        token: 'test-token',
        userId: 'test-userId',
        error: null,
        loading: false,
        authRedirectPath: '/',
      })
  })
  
  
})

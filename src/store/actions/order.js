import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId,
    orderData,
  };
}

export const purchaseFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_FAILED,
    error,
  };
}

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });
export const purchaseStart = () => ({ type: actionTypes.PURCHASE_START });

export const initPurchaseProcess = (orderData, token) => dispatch => {
  // set loading to true
  dispatch(purchaseStart());
  // post order
  axios.post(`/orders.json?auth=${token}`, orderData)
  .then(response => {
    dispatch(purchaseSuccess(response.data.name, orderData))
    })
  .catch(error => {
    dispatch(purchaseFailed(error));
  });
}

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersStart());
  // filter orders by User
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  axios.get(`/orders.json${queryParams}`)
    .then(response => {
      const fetchedOrders = []; 

      for (const key in response.data) {
        fetchedOrders.push({
          ...response.data[key], id: key});
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => {
      dispatch(fetchOrdersFailed(error));
    });
}
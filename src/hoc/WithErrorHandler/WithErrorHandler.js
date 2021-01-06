import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler'

const WithErrorHandler = (WrappedComponent, axios) => {
  const Component =  props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };

  return Component;
};

export default WithErrorHandler;

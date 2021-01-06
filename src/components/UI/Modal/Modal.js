import React from 'react'
import styleClasses from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {

  // If the show property doesn't update, do not re-render modal and orderSummary,
  // this will boost the performance, an alternative is extend pureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== props.show || nextProps.children !== props.children;
  // }


  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div 
        className={styleClasses.Modal}
        // Not ideal, but for practising dynamic inline styling
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>

  </>
  )

}

export default React.memo(
  Modal, 
  (prevProps, nextProps) => nextProps.show === prevProps.show || nextProps.children === prevProps.children
);

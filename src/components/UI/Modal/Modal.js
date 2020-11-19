import React, { Component } from 'react'
import styleClasses from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'

export class Modal extends Component {

  // If the show property doesn't update, do not re-render modal and orderSummary,
  // this will boost the performance, an alternative is extend pureComponent
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div 
          className={styleClasses.Modal}
          // Not ideal, but for practising dynamic inline styling
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>

    </>
    )
  }
}

export default Modal;

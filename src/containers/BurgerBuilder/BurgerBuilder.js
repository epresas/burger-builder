import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Aux from '../../hoc/Aux';

export class BurgerBuilder extends Component {
  static propTypes = {

  }

  render() {
    return (
     <Aux>
       <div>Burger</div>
       <div>Controls</div>
     </Aux>
    );
  }
}

export default BurgerBuilder;

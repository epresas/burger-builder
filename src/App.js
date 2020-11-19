import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'; 
import BurgerBuilder  from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

export class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {/* Change order of the elements inside switch to resolve ckeckout 
              if "/" is first, when loading "/checkout" the slash will match 
              and load the burger builder
          */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact  component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;

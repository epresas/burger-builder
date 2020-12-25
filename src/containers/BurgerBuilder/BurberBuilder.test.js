import React from 'react';

import { configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
  });

  test('should render <BuildControls/> when given ingredients', () => {
      wrapper.setProps({ings: {
        bacon: 1,
        cheese: 1,
        meat: 1,
        salad: 0,
      }});
      expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
  
});

import React from 'react';

import { configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems/>);
  });
  it('should render two <NavigationItem /> elements if not logged in', () => {
      expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if logged in', () => {
      wrapper.setProps({isAuthenticated: true});
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('should have a logout link when authenticated', () => {
      wrapper.setProps({isAuthenticated: true});
      expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
})
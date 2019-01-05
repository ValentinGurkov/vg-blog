import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../Logo';

describe('<Logo/>', () => {
  console.log('Logo');
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Logo src="some-src" />);
  });

  it('should have footerLogo class when used in footer', () => {
    wrapper.setProps({
      footer: true
    });
    expect(wrapper.hasClass('footerLogo')).toEqual(true);
  });

  it('should have image with title and alt', () => {
    const img = wrapper.find('img');
    expect(img).toHaveLength(1);
    expect(img.prop('src')).toBeDefined();
    expect(img.prop('alt')).toBeDefined();
    expect(img.prop('height')).toBeDefined();
    expect(img.prop('width')).toBeDefined();
  });
});

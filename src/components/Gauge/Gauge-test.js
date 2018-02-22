import React from 'react';
import Gauge from '../Gauge';
import { shallow } from 'enzyme';

describe('Gauge', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Gauge amount={75} total={100} title="Gauge" amountUnits="GB" />
    );

    it('renders an svg', () => {
      expect(wrapper.find('svg').length).toEqual(1);
    });

    it('renders an h2 with the appropriate title', () => {
      expect(wrapper.find('h2').length).toEqual(1);
      expect(wrapper.find('h2').text()).toBe('Gauge');
    });

    it('renders text component with two p components', () => {
      expect(wrapper.find('.text').length).toEqual(1);
      expect(wrapper.find('.text').find('p').length).toEqual(2);
      expect(wrapper.find('.amount').length).toEqual(1);
      expect(wrapper.find('.total').length).toEqual(1);
    });
  });
});

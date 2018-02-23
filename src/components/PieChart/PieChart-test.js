import React from 'react';
import PieChart from '../PieChart';
import { shallow } from 'enzyme';

describe('PieChart', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <PieChart
        data={[
          { label: 'Griffindor', value: 23 },
          { label: 'Slytherin', value: 12 },
          { label: 'Ravenclaw', value: 35 },
          { label: 'Hufflepuff', value: 22 },
          { label: 'Teachers', value: 19 },
        ]}
        title="Pie Chart"
        radius={100}
      />
    );

    it('renders an svg', () => {
      expect(wrapper.find('svg').length).toEqual(1);
    });

    it('renders an h2 with the appropriate title', () => {
      expect(wrapper.find('h2').length).toEqual(1);
      expect(wrapper.find('h2').text()).toBe('Pie Chart');
    });

    it('renders tooltip component with two p components', () => {
      expect(wrapper.find('.tooltip-pie').length).toEqual(1);
      expect(wrapper.find('.tooltip-pie').find('p').length).toEqual(2);
    });
  });
});

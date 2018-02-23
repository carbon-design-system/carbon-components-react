import React from 'react';
import LineGraph from '../LineGraph';
import { shallow } from 'enzyme';

describe('LineGraph', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <LineGraph
        data={[
          [
            { xVal: '02/20/2018', yVal: 56 },
            { xVal: '02/21/2018', yVal: 9 },
            { xVal: '02/22/2018', yVal: 52 },
            { xVal: '02/23/2018', yVal: 89 },
            { xVal: '02/24/2018', yVal: 77 },
            { xVal: '02/25/2018', yVal: 100 },
            { xVal: '02/26/2018', yVal: 21 },
          ],
          [
            { xVal: '02/20/2018', yVal: 56 },
            { xVal: '02/21/2018', yVal: 9 },
            { xVal: '02/22/2018', yVal: 52 },
            { xVal: '02/23/2018', yVal: 89 },
            { xVal: '02/24/2018', yVal: 77 },
            { xVal: '02/25/2018', yVal: 100 },
            { xVal: '02/26/2018', yVal: 21 },
          ],
        ]}
        title="Line Graph"
        width="700px"
        xLabel="DATE"
        yLabel="RANDOM NUMBER"
      />
    );

    it('renders an svg', () => {
      expect(wrapper.find('svg').length).toEqual(1);
    });

    it('renders an h2 with the appropriate title', () => {
      expect(wrapper.find('h2').length).toEqual(1);
      expect(wrapper.find('h2').text()).toBe('Line Graph');
    });

    it('renders two tooltip components that is not displayed', () => {
      expect(wrapper.find('.bx--tooltip').length).toEqual(2);
      expect(wrapper.find('#tooltip-0').props().style.display).toBe('none');
      expect(wrapper.find('#tooltip-1').props().style.display).toBe('none');
    });
  });
});

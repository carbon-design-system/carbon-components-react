import React from 'react';
import ScatterPlot from '../ScatterPlot';
import { shallow } from 'enzyme';

describe('ScatterPlot', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <ScatterPlot
        data={[
          [
            { xVal: '02/19/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/27/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
          [
            { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/16/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/14/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
          [
            { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/18/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/26/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
        ]}
        title="Scatter Plot"
        width="700px"
        xLabel="DATE"
        yLabel="RANDOM NUMBER"
        legendLabels={['Series 1', 'Series 2', 'Series 3']}
        margin={{
          top: 30,
          right: 110,
          bottom: 60,
          left: 65,
        }}
      />
    );

    it('renders an svg', () => {
      expect(wrapper.find('svg').length).toEqual(1);
    });

    it('renders an h2 with the appropriate title', () => {
      expect(wrapper.find('h2').length).toEqual(1);
      expect(wrapper.find('h2').text()).toBe('Scatter Plot');
    });

    it('renders a tooltip component that is not displayed', () => {
      expect(wrapper.find('.bx--tooltip').length).toEqual(1);
      expect(wrapper.find('.tooltip').props().style.display).toBe('none');
    });
  });
});

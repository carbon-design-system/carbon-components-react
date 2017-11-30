import React from 'react';
import DatePickerInput from '../DatePickerInput';
import { shallow } from 'enzyme';

describe('DatePickerInput', () => {
  describe('Uses default props', () => {
    const wrapper = shallow(
      <DatePickerInput id='testing'/>
    );

    it('does not include a label', () => {
      expect(wrapper.find('.bx--label').length).toBe(0);
    });

  });
});

import React from 'react';
import DatePicker from '../DatePicker';
import { shallow } from 'enzyme';

describe('DatePicker', () => {
  describe('Renders as expected', () => {
    const rootWrapper = shallow(
      <DatePicker className="extra-class">
        <div className="test-child"></div>
        <div className="test-child"></div>
      </DatePicker>
    );
    const datePicker = rootWrapper.childAt(0);

    it('has the expected classes', () => {
      expect(datePicker.hasClass('bx--date-picker')).toBe(true);
    });
  });
});

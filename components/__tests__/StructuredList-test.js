import React from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';
import { shallow } from 'enzyme';

describe('StructuredListWrapper', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <StructuredListWrapper className="extra-class">hi</StructuredListWrapper>
    );

    it('should have the expected classes', () => {
      expect(wrapper.hasClass('bx--structured-list')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('By default, should add correct modifier class when border prop is true', () => {
      wrapper.setProps({ border: true });
      expect(wrapper.hasClass('bx--structured-list--border')).toEqual(true);
    });

    it('Should remove the modifier class for border when border prop is false', () => {
      wrapper.setProps({ border: false });
      expect(wrapper.hasClass('bx--structured-list--border')).toEqual(false);
    });
  });
});

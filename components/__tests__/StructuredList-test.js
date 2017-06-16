import React from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListInput,
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

    it('By default, border prop is false', () => {
      wrapper.setProps({ border: false });
      expect(wrapper.hasClass('bx--structured-list--border')).toEqual(false);
    });

    it('By default, selection prop is false', () => {
      wrapper.setProps({ border: false });
      expect(wrapper.hasClass('bx--structured-list--selection')).toEqual(false);
    });

    it('Should add the modifier class for border when border prop is true', () => {
      wrapper.setProps({ border: true });
      expect(wrapper.hasClass('bx--structured-list--border')).toEqual(true);
    });

    it('Should add the modifier class for selection when selection prop is true', () => {
      wrapper.setProps({ selection: true });
      expect(wrapper.hasClass('bx--structured-list--selection')).toEqual(true);
    });
  });
});

describe('StructuredListHead', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <StructuredListHead className="extra-class">hi</StructuredListHead>
    );

    it('should have the expected classes', () => {
      expect(wrapper.hasClass('bx--structured-list-thead')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('Should accept other props from ...other', () => {
      const wrapperProps = shallow(<StructuredListHead title="title">hi</StructuredListHead>);
      expect(wrapperProps.props().title).toEqual('title');
    });
  });
});

describe('StructuredListInput', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<StructuredListInput className="extra-class" />);

    it('should have the expected classes', () => {
      expect(wrapper.hasClass('bx--structured-list-input')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('Should accept other props from ...other', () => {
      const wrapperProps = shallow(<StructuredListInput title="title" />);
      expect(wrapperProps.props().title).toEqual('title');
    });

    it('Should render unique id with multiple inputs when no id prop is given', () => {
      const wrapper1 = shallow(<StructuredListInput className="extra-class" />);
      const wrapper2 = shallow(<StructuredListInput className="extra-class" />);
      expect(wrapper1.props().id).not.toEqual(wrapper2.props().id);
    });
  });
});

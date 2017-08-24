import React from 'react';
import { shallow } from 'enzyme';
import { ModalBody } from '../ComposedModal';

describe('<ModalBody />', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <ModalBody className="extra-class">
        <p>Test</p>
      </ModalBody>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('p').length).toBe(1);
    });

    it('renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--modal-content')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

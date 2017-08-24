import React from 'react';
import { shallow } from 'enzyme';
import { ModalFooter } from '../ComposedModal';

describe('<ModalFooter />', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <ModalFooter className="extra-class">
        <p>Test</p>
      </ModalFooter>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('p').length).toBe(1);
    });

    it('renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--modal-footer')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Should render buttons only if appropriate prop passed in in', () => {
    const wrapper = shallow(
      <ModalFooter className="extra-class">
        <p>Test</p>
      </ModalFooter>
    );

    const primaryWrapper = shallow(<ModalFooter primaryButtonText="test" />);

    it('does not render primary button if no primary text', () => {
      expect(wrapper.find('.bx--btn--primary').exists()).toBe(false);
    });

    it('does not render secondary button if no secondary text', () => {
      expect(wrapper.find('.bx--btn--secondary').exists()).toBe(false);
    });

    it('renders primary button if primary text', () => {
      console.log(primaryWrapper.find('button').exists());
      expect(primaryWrapper.find('.bx--btn--primary').exists()).toBe(true);
    });
  });
});

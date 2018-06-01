import React from 'react';
import { mount } from 'enzyme';
import ModalWrapper from '../ModalWrapper';

describe('ModalWrapper', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      id: 'modal',
      buttonTriggerText: 'Test Modal',
      modalHeading: 'Transactional Modal',
      modalLabel: 'Test Modal Label',
      primaryButtonText: 'Save',
      secondaryButtonText: 'Cancel',
      handleSubmit: jest.fn(() => true),
      shouldCloseAfterSubmit: true,
    };
  });

  it('should render', () => {
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className="bx--modal-content__text">Text</p>
      </ModalWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should change the open state upon change in props', () => {
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className="bx--modal-content__text">Text</p>
      </ModalWrapper>
    );

    wrapper.setProps({ open: true });
    expect(wrapper.state('isOpen')).toBe(true);

    wrapper.setProps({ open: false });
    expect(wrapper.state('isOpen')).toBe(false);
  });

  it('should avoid changing the open state when receiving new props unless the value has changed', () => {
    const wrapper = mount(
      <ModalWrapper {...mockProps} open={true}>
        <p className="bx--modal-content__text">Text</p>
      </ModalWrapper>
    );

    wrapper.find({ children: mockProps.primaryButtonText }).simulate('click'); // Turns `state.open` to `false`
    wrapper.setProps({ open: true }); // No change in `open` prop
    expect(wrapper.state('isOpen')).toBe(false);
  });

  it('should close after a successful submit action', () => {
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className="bx--modal-content__text">Text</p>
      </ModalWrapper>
    );
    wrapper.find({ children: mockProps.buttonTriggerText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(true);

    wrapper.find({ children: mockProps.primaryButtonText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(false);
  });

  it('should not close after an unsuccessful submit action', () => {
    mockProps.handleSubmit = jest.fn(() => false);
    const wrapper = mount(
      <ModalWrapper {...mockProps}>
        <p className="bx--modal-content__text">Text</p>
      </ModalWrapper>
    );
    wrapper.find({ children: mockProps.buttonTriggerText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(true);

    wrapper.find({ children: mockProps.primaryButtonText }).simulate('click');
    expect(wrapper.state('isOpen')).toBe(true);
  });
});

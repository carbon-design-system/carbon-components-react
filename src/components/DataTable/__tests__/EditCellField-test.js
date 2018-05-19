import React from 'react';
import { mount } from 'enzyme';

describe('EditCellField', () => {
  let EditCellField;
  let mockProps;

  beforeEach(() => {
    EditCellField = require('../EditCellField').default;
    mockProps = {
      disabled: false,
      error: null,
      id: 'id',
      isSaving: false,
      labelText: 'label',
      onCancel: jest.fn(),
      onChange: jest.fn(),
      onSave: jest.fn(),
      type: 'text',
      value: 'value',
    };
  });

  it('should render', () => {
    const wrapper = mount(<EditCellField {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('isEditing', () => {
    it('should focus the input node when the component mounts', () => {
      const wrapper = mount(<EditCellField {...mockProps} />);
      expect(wrapper.instance().inputNode).toEqual(document.activeElement);
      expect(wrapper.state('isEditing')).toBe(true);
    });

    it('should remove the editing class if the user blurs the input node', () => {
      const wrapper = mount(<EditCellField {...mockProps} />);
      wrapper.find('input').simulate('blur');
      expect(wrapper.state('isEditing')).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });

    it('should not display editing classes if the control is being saved', () => {
      const wrapper = mount(<EditCellField {...mockProps} isSaving />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with error', () => {
    it('should render', () => {
      const wrapper = mount(<EditCellField {...mockProps} error="error" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should not display an error if the control is being saved', () => {
      const wrapper = mount(
        <EditCellField {...mockProps} error="error" isSaving />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});

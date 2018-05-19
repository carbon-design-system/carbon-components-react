import React from 'react';
import { mount } from 'enzyme';

const getCancelTrigger = wrapper => wrapper.find('button').first();
const getEditTrigger = wrapper => wrapper.find('.bx--data-table-cell__edit');
const getSaveTrigger = wrapper => wrapper.find('button').last();
const getTextInput = wrapper => wrapper.find('input');
const startEditing = wrapper => getEditTrigger(wrapper).simulate('click');

const nextTick = () => new Promise(resolve => process.nextTick(resolve));

describe('EditableTextCell', () => {
  let EditableTextCell;
  let mockProps;
  let mountNode;

  beforeEach(() => {
    EditableTextCell = require('../EditableTextCell').default;
    mockProps = {
      className: 'custom-class',
      id: 'id',
      initialValue: 'value-0',
      onToggleEditCell: jest.fn(),
      onSave: jest.fn(),
      onCancel: jest.fn(),
      isEditable: true,
      validate: jest.fn(),
    };

    mountNode = document.createElement('table');
    mountNode.innerHTML = '<tbody><tr></tr></tbody>';
    mountNode.id = 'root';
    document.body.appendChild(mountNode);

    mountNode = document.querySelector('#root tr');
  });

  afterEach(() => {
    const rootNode = document.querySelector('#root');
    rootNode.parentNode.removeChild(rootNode);
  });

  it('should render', () => {
    const wrapper = mount(<EditableTextCell {...mockProps} />, {
      attachTo: mountNode,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should default to the initialValue provided', () => {
    const wrapper = mount(<EditableTextCell {...mockProps} />, {
      attachTo: mountNode,
    });
    expect(wrapper.find('.bx--data-table-cell__content').text()).toBe(
      mockProps.initialValue
    );
    expect(getEditTrigger(wrapper).prop('title')).toBe(
      `Edit Cell: ${mockProps.initialValue}`
    );
  });

  it('should switch to edit mode when a user clicks on the edit button', () => {
    const wrapper = mount(<EditableTextCell {...mockProps} />, {
      attachTo: mountNode,
    });
    getEditTrigger(wrapper).simulate('click');
    expect(wrapper.find('EditCellField').length).toBe(1);
  });

  it('should update the value of the input as the user types', () => {
    const wrapper = mount(<EditableTextCell {...mockProps} />, {
      attachTo: mountNode,
    });
    startEditing(wrapper);
    getTextInput(wrapper).simulate('change', {
      target: {
        value: 'foo',
      },
    });
    expect(wrapper.state('value')).toBe('foo');
  });

  it('should revert any changes to the input if the cancel button is clicked', () => {
    const wrapper = mount(<EditableTextCell {...mockProps} />, {
      attachTo: mountNode,
    });
    startEditing(wrapper);
    getTextInput(wrapper).simulate('change', {
      target: {
        value: 'foo',
      },
    });
    getCancelTrigger(wrapper).simulate('click');

    expect(wrapper.state('value')).toBe(mockProps.initialValue);
    expect(mockProps.onCancel).toHaveBeenCalledWith({ value: 'foo' });
  });

  it('should call validate on each change to the value of the input', () => {
    const wrapper = mount(<EditableTextCell {...mockProps} />, {
      attachTo: mountNode,
    });
    startEditing(wrapper);
    getTextInput(wrapper).simulate('change', {
      target: {
        value: 'foo',
      },
    });
    expect(mockProps.validate).toHaveBeenCalledTimes(1);
  });

  it('should show validation errors if they exist in response to input changes', async () => {
    const mockError = new Error('error');
    const mockValidate = () => Promise.reject(mockError);
    const wrapper = mount(
      <EditableTextCell {...mockProps} validate={mockValidate} />,
      {
        attachTo: mountNode,
      }
    );
    startEditing(wrapper);
    getTextInput(wrapper).simulate('change', {
      target: {
        value: 'foo',
      },
    });

    await nextTick();

    expect(wrapper.state('error')).toBe(mockError.message);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call `onSave` prop when the user clicks on Save and show a spinner', async () => {
    const wrapper = mount(<EditableTextCell {...mockProps} />, {
      attachTo: mountNode,
    });
    startEditing(wrapper);
    getTextInput(wrapper).simulate('change', {
      target: {
        value: 'foo',
      },
    });
    getSaveTrigger(wrapper).simulate('click');

    expect(wrapper.state('isSaving')).toBe(true);
    expect(mockProps.onSave).toHaveBeenCalledWith({
      value: 'foo',
    });

    await nextTick();

    expect(wrapper).toMatchSnapshot();
  });
});

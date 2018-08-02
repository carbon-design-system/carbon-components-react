import React from 'react';
import { shallow } from 'enzyme';
import { TableBatchEditTextInput } from '../';

describe('DataTable.TableBatchEditTextInput', () => {
  it('should render', () => {
    const wrapper = shallow(<TableBatchEditTextInput id="id-foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(
      <TableBatchEditTextInput id="id-foo" data-foo="Foo" />
    );
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should wrap form validation message in a tooltip', () => {
    const wrapper = shallow(
      <TableBatchEditTextInput
        id="id-foo"
        invalid
        invalidText="invalid-text-foo"
      />
    );
    expect(wrapper.prop('invalidText').props.children).toBe('invalid-text-foo');
  });
});

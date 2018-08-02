import React from 'react';
import { shallow } from 'enzyme';
import { TableBatchEditNumberInput } from '../';

describe('DataTable.TableBatchEditNumberInput', () => {
  it('should render', () => {
    const wrapper = shallow(<TableBatchEditNumberInput id="id-foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(
      <TableBatchEditNumberInput id="id-foo" data-foo="Foo" />
    );
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should wrap form validation message in a tooltip', () => {
    const wrapper = shallow(
      <TableBatchEditNumberInput
        id="id-foo"
        invalid
        invalidText="invalid-text-foo"
      />
    );
    expect(wrapper.prop('invalidText').props.children).toBe('invalid-text-foo');
  });
});

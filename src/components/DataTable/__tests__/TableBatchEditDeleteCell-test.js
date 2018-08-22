import React from 'react';
import { shallow } from 'enzyme';
import { BatchEditableTableDeleteCell } from '../';

describe('DataTable.BatchEditableTableDeleteCell', () => {
  it('should render', () => {
    const wrapper = shallow(<BatchEditableTableDeleteCell />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<BatchEditableTableDeleteCell data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom CSS class on the top-level node', () => {
    const wrapper = shallow(
      <BatchEditableTableDeleteCell className="class-foo" />
    );
    expect(wrapper.hasClass('class-foo')).toBe(true);
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <BatchEditableTableDeleteCell>
        <div />
        <span />
      </BatchEditableTableDeleteCell>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });
});

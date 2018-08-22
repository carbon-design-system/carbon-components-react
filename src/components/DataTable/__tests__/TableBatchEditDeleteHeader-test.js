import React from 'react';
import { shallow } from 'enzyme';
import { BatchEditableTableDeleteHeader } from '../';

describe('DataTable.BatchEditableTableDeleteHeader', () => {
  it('should render', () => {
    const wrapper = shallow(<BatchEditableTableDeleteHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<BatchEditableTableDeleteHeader data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom CSS class on the top-level node', () => {
    const wrapper = shallow(
      <BatchEditableTableDeleteHeader className="class-foo" />
    );
    expect(wrapper.hasClass('class-foo')).toBe(true);
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <BatchEditableTableDeleteHeader>
        <div />
        <span />
      </BatchEditableTableDeleteHeader>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });
});

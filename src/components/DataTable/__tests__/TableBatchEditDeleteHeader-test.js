import React from 'react';
import { shallow } from 'enzyme';
import { TableBatchEditDeleteHeader } from '../';

describe('DataTable.TableBatchEditDeleteHeader', () => {
  it('should render', () => {
    const wrapper = shallow(<TableBatchEditDeleteHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<TableBatchEditDeleteHeader data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom CSS class on the top-level node', () => {
    const wrapper = shallow(
      <TableBatchEditDeleteHeader className="class-foo" />
    );
    expect(wrapper.hasClass('class-foo')).toBe(true);
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <TableBatchEditDeleteHeader>
        <div />
        <span />
      </TableBatchEditDeleteHeader>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });
});

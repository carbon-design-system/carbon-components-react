import React from 'react';
import { shallow } from 'enzyme';
import { TableBatchEditDeleteCell } from '../';

describe('DataTable.TableBatchEditDeleteCell', () => {
  it('should render', () => {
    const wrapper = shallow(<TableBatchEditDeleteCell />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<TableBatchEditDeleteCell data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom CSS class on the top-level node', () => {
    const wrapper = shallow(<TableBatchEditDeleteCell className="class-foo" />);
    expect(wrapper.hasClass('class-foo')).toBe(true);
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <TableBatchEditDeleteCell>
        <div />
        <span />
      </TableBatchEditDeleteCell>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { TableBatchEditable } from '../';

describe('DataTable.TableBatchEditable', () => {
  it('should render', () => {
    const wrapper = shallow(<TableBatchEditable />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<TableBatchEditable data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom CSS class on the top-level node', () => {
    const wrapper = shallow(<TableBatchEditable className="class-foo" />);
    expect(wrapper.hasClass('class-foo')).toBe(true);
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <TableBatchEditable>
        <div />
        <span />
      </TableBatchEditable>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });

  it('should cover up the content during saving', () => {
    const wrapper = shallow(<TableBatchEditable saving />);
    expect(wrapper.hasClass('bx--data-table-v2--batch-saving')).toBe(true);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { BatchEditableTable } from '../';

describe('DataTable.BatchEditableTable', () => {
  it('should render', () => {
    const wrapper = shallow(<BatchEditableTable />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<BatchEditableTable data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom CSS class on the top-level node', () => {
    const wrapper = shallow(<BatchEditableTable className="class-foo" />);
    expect(wrapper.hasClass('class-foo')).toBe(true);
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <BatchEditableTable>
        <div />
        <span />
      </BatchEditableTable>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });

  it('should cover up the content during saving', () => {
    const wrapper = shallow(<BatchEditableTable saving />);
    expect(wrapper.hasClass('bx--data-table-v2--batch-saving')).toBe(true);
  });
});

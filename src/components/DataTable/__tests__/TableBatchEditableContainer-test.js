import React from 'react';
import { shallow } from 'enzyme';
import { BatchEditableTableContainer } from '../';

describe('DataTable.BatchEditableTableContainer', () => {
  it('should render', () => {
    const wrapper = shallow(<BatchEditableTableContainer />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<BatchEditableTableContainer data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom CSS class on the top-level node', () => {
    const wrapper = shallow(
      <BatchEditableTableContainer className="class-foo" />
    );
    expect(wrapper.hasClass('class-foo')).toBe(true);
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <BatchEditableTableContainer>
        <div />
        <span />
      </BatchEditableTableContainer>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });

  it('should add edit mode style during editing', () => {
    const wrapper = shallow(<BatchEditableTableContainer editing />);
    expect(wrapper.hasClass('bx--data-table-v2--batch-editing')).toBe(true);
  });
});

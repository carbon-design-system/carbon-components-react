import React from 'react';
import { shallow } from 'enzyme';
import InvalidIcon from '../InvalidIcon';

describe('InvalidIcon', () => {
  it('should render', () => {
    const wrapper = shallow(<InvalidIcon />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(<InvalidIcon data-foo="Foo" />);
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should render custom child nodes', () => {
    const wrapper = shallow(
      <InvalidIcon>
        <div />
        <span />
      </InvalidIcon>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });
});

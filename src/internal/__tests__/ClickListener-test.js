import React from 'react';
import ClickListener from '../ClickListener';
import { shallow, mount } from 'enzyme';

describe('ClickListener', () => {
  it('renders children as expected', () => {
    const onClickOutside = jest.fn();

    const wrapper = shallow(
      <ClickListener onClickOutside={onClickOutside}>
        <div>
          <div className="child">Test</div>
          <div className="child">Test</div>
        </div>
      </ClickListener>
    );

    expect(wrapper.find('.child').length).toBe(2);
  });

  it('throws if too many children are provided', () => {
    expect(() => {
      shallow(
        <ClickListener onClickOutside={() => {}}>
          <div className="child">Test</div>
          <div className="child">Test</div>
        </ClickListener>
      );
    }).toThrow();
  });

  it('should invoke onClickOutside if click is outside of the component', () => {
    const onClickOutside = jest.fn();

    mount(
      <ClickListener onClickOutside={onClickOutside}>
        <div>
          <div className="child">Test</div>
          <div className="child">Test</div>
        </div>
      </ClickListener>
    );

    const evt = new MouseEvent('click');
    document.dispatchEvent(evt);

    expect(onClickOutside).toBeCalled();
  });
});

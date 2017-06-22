import React from 'react';
import Slider from '../Slider';
import TextInput from '../TextInput';
import { mount } from 'enzyme';

describe('Slider', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Slider id="slider" value={50} min={0} max={100} step={1}>
        <TextInput id="input-for-slider" className="bx--text-input bx-slider-text-input"/>
      </Slider>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.bx--text-input').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--slider')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('can be disabled', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('.bx--slider-container').props().disabled).toEqual(true);
    });

    it('can set value via props', () => {
      wrapper.setProps({ value: 55 });
      expect(wrapper.find('.bx--slider-container').props().value).toEqual(55);
    });
    it('can change step size', () => {
    });
    it('can change step size', () => {
    });
  });
});

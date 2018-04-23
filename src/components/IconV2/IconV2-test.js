import React from 'react';
import Icon, { svgShapes } from '../IconV2';
import { mount } from 'enzyme';
import { iconSearch, iconSearchGlyph } from 'carbon-icons';

describe('IconV2', () => {
  describe('Renders as expected', () => {
    const props = {
      className: 'extra-class',
      icon: iconSearchGlyph,
      width: '20',
      height: '20',
      description: 'close the thing',
      style: {
        transition: '2s',
      },
    };

    const wrapper = mount(<Icon {...props} />);

    it('Renders `description` as expected', () => {
      expect(wrapper.props().description).toEqual('close the thing');
    });

    it('should have a default role prop', () => {
      expect(wrapper.props().role).toEqual('img');
    });

    it('should have expected viewBox on <svg>', () => {
      expect(wrapper.find('svg').props().viewBox).not.toEqual('');
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.props().className).toEqual('extra-class');
    });

    it('should recieve width props', () => {
      expect(wrapper.props().width).toEqual('20');
    });

    it('should recieve height props', () => {
      expect(wrapper.props().height).toEqual('20');
    });

    it('should recieve style props', () => {
      expect(wrapper.props().style).toEqual({ transition: '2s' });
    });
  });

  describe('svgShapes', () => {
    it('returns with SVG XML when given a valid icon name', () => {
      const content = svgShapes(iconSearch);
      expect(content.length).toBeGreaterThan(0);
    });

    it('returns empty when given an icon with no valid svgProp', () => {
      const svgData = {
        invalidProp: [{ invalidAttribute: 43 }],
      };
      const content = svgShapes(svgData);
      expect(content.length).toBeGreaterThan(0);
      expect(content).toEqual(['']);
    });
  });
});

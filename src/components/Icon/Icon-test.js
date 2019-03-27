/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { iconSearch } from 'carbon-icons';
import Icon, { svgShapes } from '../Icon';
import { mount } from 'enzyme';

describe('Icon', () => {
  describe('Renders as expected', () => {
    const props = {
      className: 'extra-class',
      icon: iconSearch,
      width: '20',
      height: '20',
      description: 'close the thing',
      iconTitle: 'title',
      style: {
        transition: '2s',
      },
    };

    const wrapper = mount(<Icon {...props} />);

    it('Renders `description` as expected', () => {
      expect(wrapper.props().description).toEqual('close the thing');
    });

    it('Renders `title` as expected', () => {
      expect(wrapper.props().iconTitle).toEqual('title');
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
    it('returns empty when given an icon with no valid svgProp', () => {
      const svgData = {
        invalidProp: [{ invalidAttribute: 43 }],
      };
      const content = svgShapes(svgData);
      expect(content.length).toBeGreaterThan(0);
      expect(content).toEqual(['']);
    });

    it('takes care of polygons', () => {
      const svgData = {
        polygons: [
          {
            points: 'POINT',
          },
        ],
      };
      expect(
        svgShapes(svgData).map(item =>
          item.map(({ type, key, props }) => ({ type, key, props }))
        )
      ).toEqual([
        [{ type: 'polygon', key: 'key0', props: { points: 'POINT' } }],
      ]);
    });
  });
});

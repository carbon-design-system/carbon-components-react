import React from 'react';
import DataTooltip from '../DataTooltip';
import { shallow } from 'enzyme';

describe('DataTooltip', () => {
  describe('Small DataTooltip renders as expected', () => {
    const wrapper = shallow(<DataTooltip value={'$250.17'} />);

    it('renders an unordered list', () => {
      expect(wrapper.children().find('ul').length).toEqual(1);
    });

    it('renders a single list item', () => {
      expect(
        wrapper
          .children()
          .children()
          .type().displayName
      ).toEqual('styled.li');
    });

    it('renders given value inside a span component', () => {
      expect(
        wrapper
          .children()
          .children()
          .children().length
      ).toEqual(1);
      expect(
        wrapper
          .children()
          .children()
          .children()
          .at(0)
          .type().displayName
      ).toEqual('styled.span');
      expect(
        wrapper
          .children()
          .children()
          .children()
          .children()
          .text()
      ).toBe('$250.17');
    });
  });

  describe('Medium DataTooltip renders as expected', () => {
    const wrapper = shallow(
      <DataTooltip
        size="medium"
        value={'$250.17'}
        label="Jan"
        color="#3b1a40"
      />
    );

    it('renders an unordered list', () => {
      expect(wrapper.children().find('ul').length).toEqual(1);
    });

    it('renders a single list item', () => {
      expect(
        wrapper
          .children()
          .children()
          .type().displayName
      ).toEqual('styled.li');
    });

    it('renders given value inside a span component', () => {
      expect(
        wrapper
          .children()
          .children()
          .children().length
      ).toEqual(2);
      expect(
        wrapper
          .children()
          .children()
          .children()
          .at(0)
          .type().displayName
      ).toEqual('styled.span');
      expect(
        wrapper
          .children()
          .children()
          .children()
          .at(0)
          .children()
          .text()
      ).toBe('Jan');
    });

    it('renders given value inside a span component', () => {
      expect(
        wrapper
          .children()
          .children()
          .children()
          .at(1)
          .type().displayName
      ).toEqual('styled.span');
      expect(
        wrapper
          .children()
          .children()
          .children()
          .at(1)
          .children()
          .text()
      ).toBe('$250.17');
    });
  });

  describe('Large DataTooltip renders as expected', () => {
    const wrapper = shallow(
      <DataTooltip
        size="large"
        data={[
          { label: "Torchy's", value: '$250.17', color: '#3b1a40' },
          { label: 'Tacodeli', value: '$250.17', color: '#473793' },
          { label: 'Veracruz', value: '$250.17', color: '#3c6df0' },
        ]}
        label="January"
      />
    );

    it('renders label with provided text', () => {
      expect(
        wrapper
          .children()
          .at(0)
          .children()
          .text()
      ).toEqual('January');
    });

    it('renders unordered list', () => {
      expect(
        wrapper
          .children()
          .at(1)
          .type().displayName
      ).toEqual('styled.ul');
    });

    it('renders three list items', () => {
      expect(
        wrapper
          .children()
          .at(1)
          .children().length
      ).toEqual(3);
    });

    it('renders the given label and value in each list item', () => {
      expect(
        wrapper
          .children()
          .at(1)
          .children()
          .at(0)
          .children().length
      ).toEqual(2);
      expect(
        wrapper
          .children()
          .at(1)
          .children()
          .at(0)
          .children()
          .at(0)
          .children()
          .text()
      ).toEqual("Torchy's");
      expect(
        wrapper
          .children()
          .at(1)
          .children()
          .at(0)
          .children()
          .at(1)
          .children()
          .text()
      ).toEqual('$250.17');
    });
  });
});

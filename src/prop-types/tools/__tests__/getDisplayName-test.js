import React, { Component, createElement } from 'react';
import getDisplayName from '../getDisplayName';

describe('getDisplayName', () => {
  it('should get the name from a React element', () => {
    const element = <span />;
    expect(getDisplayName(element.type)).toBe('span');
  });

  it('should get the name from a Stateless Functional Component', () => {
    const Child = () => <div />;
    expect(getDisplayName(createElement(Child).type)).toBe('Child');
  });

  it('should get the displayName from a class Component', () => {
    class Child extends Component {
      static displayName = 'ChildDisplayName';
      render() {
        return null;
      }
    }
    expect(getDisplayName(createElement(Child).type)).toBe(Child.displayName);
  });
});

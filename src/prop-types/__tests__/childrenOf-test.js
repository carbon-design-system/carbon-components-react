import React from 'react';
import { createProxy } from 'react-proxy';
import childrenOf from '../childrenOf';

const StatelessComponent = () => <div />;
class ClassComponent extends React.Component {
  render() {
    return <div />;
  }
}

// Note: when testing here, each component that passes children should have a
// unique name. Otherwise, React will not report all invalid prop types because
// it believes the name has already reported an issue in an earlier test.
describe('childrenOf', () => {
  let spy;

  beforeEach(() => {
    // We create a spy on `console.error` here since this is the vehicle React
    // uses to communicate invalid prop types. Tests should make sure to assert
    // on the number of times this is called to make sure we aren't swallowing
    // any errors unexpectedly.
    spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    reactHotLoader.disableProxyCreation = true;
  });

  afterEach(() => {
    spy.mockRestore();
    reactHotLoader.reset();
  });

  it('should Validate RHL proxied children of given a enum of types', () => {
    reactHotLoader.disableProxyCreation = false;
    const ProxiedChildrenEnumValid = ({ children }) => <div>{children}</div>;
    ProxiedChildrenEnumValid.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]),
    };
    <ProxiedChildrenEnumValid>
      <StatelessComponent />
      <ClassComponent />
    </ProxiedChildrenEnumValid>;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should Validate RHL proxied children of given a enum of types', () => {
    const ProxiedChildrenEnumValid = ({ children }) => createProxy(children);
    ProxiedChildrenEnumValid.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]),
    };
    <ProxiedChildrenEnumValid>
      <StatelessComponent />
      <ClassComponent />
    </ProxiedChildrenEnumValid>;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should validate children of a given enum of types', () => {
    const ChildEnumValid = ({ children }) => <div>{children}</div>;
    ChildEnumValid.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]),
    };
    <ChildEnumValid>
      <StatelessComponent />
      <ClassComponent />
    </ChildEnumValid>;
    expect(spy).not.toHaveBeenCalled();
  });

  it('should warn with an invalid prop type for an invalid type', () => {
    const ChildEnumInvalid = ({ children }) => <div>{children}</div>;
    ChildEnumInvalid.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]),
    };
    <ChildEnumInvalid>
      <div />
      <StatelessComponent />
      <ClassComponent />
    </ChildEnumInvalid>;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Warning: Failed prop type: Invalid prop `children` of type `div` ' +
          'supplied to `ChildEnumInvalid`, expected each child to be one of: ' +
          '`[StatelessComponent, ClassComponent]`.'
      )
    );
  });

  it('should work with `isRequired`', () => {
    const RequiredChildrenOfTest = ({ children }) => <div>{children}</div>;
    RequiredChildrenOfTest.propTypes = {
      children: childrenOf([StatelessComponent, ClassComponent]).isRequired,
    };
    <RequiredChildrenOfTest />;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'The prop `children` is marked as required in ' +
          'RequiredChildrenOfTest, but its value is `undefined`.'
      )
    );
  });
});

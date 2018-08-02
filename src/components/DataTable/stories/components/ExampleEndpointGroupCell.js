import React, { Fragment } from 'react';
import ExampleEndpointGroupTypeCell from './ExampleEndpointGroupTypeCell';
import ExampleEndpointGroupValueCell from './ExampleEndpointGroupValueCell';

export default ({
  id,
  type,
  value,
  typeItems,
  securityGroupItems,
  invalid,
  invalidText,
  onChange,
}) => {
  return (
    <Fragment>
      <ExampleEndpointGroupTypeCell
        id={`${id}-type`}
        type={type}
        items={typeItems}
        onChange={onChange}
      />
      <ExampleEndpointGroupValueCell
        id={`${id}-value`}
        type={type}
        value={value}
        items={securityGroupItems}
        invalid={invalid}
        invalidText={invalidText}
        onChange={onChange}
      />
    </Fragment>
  );
};

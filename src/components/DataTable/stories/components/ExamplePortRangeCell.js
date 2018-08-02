import React, { Fragment } from 'react';
import ExamplePortRangeTypeCell from './ExamplePortRangeTypeCell';
import ExamplePortRangeValueCell from './ExamplePortRangeValueCell';

export default ({
  id,
  type,
  value,
  invalid,
  invalidText,
  typeItems,
  onChange,
}) => {
  return (
    <Fragment>
      <ExamplePortRangeTypeCell
        id={`${id}-type`}
        type={type}
        items={typeItems}
        onChange={onChange}
      />
      <ExamplePortRangeValueCell
        id={`${id}-value`}
        type={type}
        value={value}
        invalid={invalid}
        invalidText={invalidText}
        onChange={onChange}
      />
    </Fragment>
  );
};

/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import SkeletonText from '../SkeletonText';

storiesOf('SkeletonText', module)
  .addWithInfo(
    'testing only',
    `
      Add description
    `,
    () => (
      <div style={{ width: '600px' }}>
        <p>SkeletonText</p>
        <SkeletonText />
        <br />
        <p>SkeletonText width="100px"</p>
        <SkeletonText width="100px" />
        <br />
        <p>SkeletonText heading + SkeletonText paragraph width="350px" </p>
        <SkeletonText heading />
        <SkeletonText paragraph width="350px" />
        <br />
        <p>SkeletonText paragraph width="200px" lineCount={6}</p>
        <SkeletonText paragraph width="200px" lineCount={6} />
        <p>SkeletonText paragraph</p>
        <SkeletonText paragraph />
        <p>SkeletonText width="25%"</p>
        <SkeletonText width="25%" />
      </div>
    )
  )
  .addWithInfo(
    'default',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This example shows a skeleton state for a line of text.
    `,
    () => (
      <div style={{ width: '300px' }}>
        <SkeletonText />
      </div>
    )
  )
  .addWithInfo(
    'heading',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This example shows a skeleton state for a heading.
    `,
    () => (
      <div style={{ width: '300px' }}>
        <SkeletonText heading />
      </div>
    )
  )
  .addWithInfo(
    'paragraph',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This examples shows a skeleton state for a paragraph of text.
    `,
    () => (
      <div style={{ width: '500px' }}>
        <SkeletonText paragraph />
        <br />
        <SkeletonText width="250px" lineCount={8} paragraph />
      </div>
    )
  );

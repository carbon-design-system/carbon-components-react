/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import ProgressIndicatorSkeleton from '../ProgressIndicator/ProgressIndicator.Skeleton';
import Tooltip from '../Tooltip';
import { componentsX } from '../../internal/FeatureFlags';

storiesOf('Progress Indicator', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <ProgressIndicator
        currentIndex={number('Current progress (currentIndex)', 1)}>
        <ProgressStep
          label="First step"
          description="Step 1: Getting started with Carbon Design System"
          secondaryLabel="Optional label"
        />
        <ProgressStep
          label={componentsX ? null : 'Second step with tooltip'}
          description="Step 2: Getting started with Carbon Design System"
          renderTooltip={() => (
            <Tooltip
              direction="bottom"
              showIcon={false}
              triggerClassName="bx--progress-label"
              triggerText={'Second step with tooltip'}
              tooltipId="tooltipId-0">
              <p>Overflow tooltip content.</p>
            </Tooltip>
          )}
        />
        <ProgressStep
          label={componentsX ? null : 'Third step with tooltip'}
          description="Step 3: Getting started with Carbon Design System"
          renderTooltip={() => (
            <Tooltip
              direction="bottom"
              showIcon={false}
              triggerClassName="bx--progress-label"
              triggerText={'Third step with tooltip'}
              tooltipId="tooltipId-1">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
                blanditiis cumque maxime tenetur veniam est illo deserunt sint
                quae pariatur. Laboriosam, consequatur.
              </p>
            </Tooltip>
          )}
        />
        <ProgressStep
          label="Fourth step"
          description="Step 4: Getting started with Carbon Design System"
          invalid
          secondaryLabel="Example invalid step"
        />
        <ProgressStep
          label="Fifth step"
          description="Step 5: Getting started with Carbon Design System"
          disabled
        />
      </ProgressIndicator>
    ),
    {
      info: {
        text: `
            For React usage, ProgressIndicator holds the currentIndex state to indicate which ProgerssStep is the current step. The ProgressIndicator component should always be used with ProgressStep components as its children. Changing currentIndex prop will automatically set the ProgressStep components props (complete, incomplete, current).
            For general usage, Progress Indicators display steps in a process. It should indicate when steps have been complete, the active step,
            and the steps to come.
          `,
      },
    }
  )
  .add('skeleton', () => <ProgressIndicatorSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
        `,
    },
  });

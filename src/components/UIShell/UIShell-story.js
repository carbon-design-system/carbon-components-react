import { Notification16, User16 } from '@carbon/icons-react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import React from 'react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

import PlatformHeader from './PlatformHeader';
import PlatformHeaderName from './PlatformHeaderName';
import PlatformHeaderNav from './PlatformHeaderNav';
import PlatformHeaderNavLink from './PlatformHeaderNavLink';
import PlatformHeaderNavMenu from './PlatformHeaderNavMenu';
import PlatformHeaderNavMenuItem from './PlatformHeaderNavMenuItem';
import PlatformHeaderGlobal from './PlatformHeaderGlobal';
import PlatformHeaderAction from './PlatformHeaderAction';

// Ideally, we'd have a <UIShell> component that could help make using these
// components much simpler. In the interim, we're going to create presentational
// components and try and piece them together to figure out what are standard
// usage patterns for each to see what kind of component API we should expose
storiesOf('UI Shell', module).add(
  'PlatformHeader',
  withReadme(
    readme,
    withInfo({
      text: '[Experimental] UI Shell',
    })(() => (
      <PlatformHeader>
        <PlatformHeaderName platform="Cloud" />
        <PlatformHeaderNav ariaLabel="Platform Name">
          <PlatformHeaderNavLink href="#">Catalog</PlatformHeaderNavLink>
          <PlatformHeaderNavLink href="#">Docs</PlatformHeaderNavLink>
          <PlatformHeaderNavMenu ariaLabel="Support" title="Support">
            <PlatformHeaderNavMenuItem href="#">
              What's new
            </PlatformHeaderNavMenuItem>
            <PlatformHeaderNavMenuItem href="#">
              Support center
            </PlatformHeaderNavMenuItem>
            <PlatformHeaderNavMenuItem href="#">
              Add ticket
            </PlatformHeaderNavMenuItem>
            <PlatformHeaderNavMenuItem href="#">
              View tickets
            </PlatformHeaderNavMenuItem>
            <PlatformHeaderNavMenuItem href="#">
              Status
            </PlatformHeaderNavMenuItem>
          </PlatformHeaderNavMenu>
        </PlatformHeaderNav>
        <PlatformHeaderGlobal>
          <PlatformHeaderAction onClick={action('notification click')}>
            <Notification16 />
          </PlatformHeaderAction>
          <PlatformHeaderAction onClick={action('user click')}>
            <User16 />
          </PlatformHeaderAction>
        </PlatformHeaderGlobal>
      </PlatformHeader>
    ))
  )
);

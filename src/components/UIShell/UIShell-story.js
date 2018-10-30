import { Notification16, User16 } from '@carbon/icons-react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import React from 'react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

import Header from './Header';
import HeaderMenuButton from './HeaderMenuButton';
import HeaderName from './HeaderName';
import HeaderNavigation from './HeaderNavigation';
import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';
import HeaderGlobalBar from './HeaderGlobalBar';
import HeaderGlobalAction from './HeaderGlobalAction';

import SideNav from './SideNav';
import SideNavTitleBar from './SideNavTitleBar';
import SideNavItem from './SideNavItem';
import SideNavItems from './SideNavItems';
import SideNavMenuItem from './SideNavMenuItem';
import SideNavMenu from './SideNavMenu';
import SideNavCategoryItem from './SideNavCategoryItem';
import SideNavCategory from './SideNavCategory';

// Ideally, we'd have a <UIShell> component that could help make using these
// components much simpler. In the interim, we're going to create presentational
// components and try and piece them together to figure out what are standard
// usage patterns for each to see what kind of component API we should expose
storiesOf('[Experimental] UI Shell', module)
  .add(
    'Header',
    withReadme(
      readme,
      withInfo({
        text: '[Experimental] UI Shell',
      })(() => (
        <Header>
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={action('Menu clicked')}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Catalog</HeaderMenuItem>
            <HeaderMenuItem href="#">Docs</HeaderMenuItem>
            <HeaderMenuItem href="#">Support</HeaderMenuItem>
            <HeaderMenu aria-label="Manage">
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification16 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Profile"
              onClick={action('user click')}>
              <User16 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      ))
    )
  )
  .add(
    'SideNav',
    withReadme(
      readme,
      withInfo({
        text: '[Experimental] UI Shell',
      })(() => (
        <>
          <Header>
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={action('Menu clicked')}
            />
            <HeaderName href="#" prefix="IBM">
              [Platform]
            </HeaderName>
            <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem href="#">Catalog</HeaderMenuItem>
              <HeaderMenuItem href="#">Docs</HeaderMenuItem>
              <HeaderMenuItem href="#">Support</HeaderMenuItem>
              <HeaderMenu aria-label="Manage">
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Notifications"
                onClick={action('notification click')}>
                <Notification16 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Profile"
                onClick={action('user click')}>
                <User16 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
          <SideNav>
            <SideNavTitleBar title="Title">
              <SideNavMenu
                label="Menu"
                onChange={action('Title bar menu - onChange')}>
                <SideNavMenuItem>Option 1</SideNavMenuItem>
                <SideNavMenuItem>Option 2</SideNavMenuItem>
                <SideNavMenuItem>Option 3</SideNavMenuItem>
              </SideNavMenu>
            </SideNavTitleBar>
            <SideNavItems>
              <SideNavCategory title="Category label">
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
              </SideNavCategory>
              <SideNavCategory title="Category label">
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
              </SideNavCategory>
              <SideNavCategory title="Category label that is incredibly long">
                <SideNavCategoryItem href="#">
                  Link text that is also incredibly long
                </SideNavCategoryItem>
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
                <SideNavCategoryItem href="#">Link</SideNavCategoryItem>
              </SideNavCategory>
              <SideNavCategory title="Lorem ipsum">
                <SideNavCategoryItem href="#">A</SideNavCategoryItem>
                <SideNavCategoryItem href="#">B</SideNavCategoryItem>
                <SideNavCategoryItem href="#">C</SideNavCategoryItem>
              </SideNavCategory>
            </SideNavItems>
          </SideNav>
          <div className="bx--content">
            <h2>Content</h2>
          </div>
        </>
      ))
    )
  );

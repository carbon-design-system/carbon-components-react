import React from 'react';
import { action, storiesOf } from '@storybook/react';
import Breadcrumb from '../../components/Breadcrumb';
import BreadcrumbItem from '../../components/BreadcrumbItem';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';
import DetailPageHeaderCustom from '../../components/DetailPageHeaderCustom';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import Icon from '../../components/Icon';
import Tag from '../../components/Tag';
import Link from '../../components/Link';

const overflowMenuProps = {
  onClick: action('onClick'),
  className: 'some-class',
  flipped: true,
};

const overflowMenuItemProps = {
  onClick: action('onClick'),
  className: 'some-class',
};

const defaultProps = {
  title: 'Detail Page Header',
  icon: <Icon name="watson" />,
};

const topProps = {
  ...defaultProps,
  top: (<Breadcrumb>
    <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
    <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
  </Breadcrumb>),
};

const bottomProps = {
  ...defaultProps,
  bottom: (<Tabs>
    <Tab label="Overview" />
    <Tab label="Apple" />
    <Tab label="Banana" />
    <Tab label="Orange" />
  </Tabs>),
};

const sideProps = {
  ...defaultProps,
  side: (<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <Tag type="ibm">
      Tag 2
    </Tag>
    <Tag type="ibm">
      Tag 3
    </Tag>
    <OverflowMenu {...overflowMenuProps}>
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Stop App" />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Restart App" />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Rename App" />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Edit Routes and Access"
      />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Delete App"
        isDelete
      />
    </OverflowMenu>
    <Tag type="ibm">
      Tag 4
    </Tag>
  </div>),
};

const extraProps = {
  ...defaultProps,
  extra: (<div><Tag type="ibm">
      Language
    </Tag>
    <Link href="#">
      View demo
    </Link>
    <Tag type="ibm">
      Tag 2
    </Tag>
    <Tag type="ibm">
      Tag 3
    </Tag>
    <Tag type="ibm">
      Tag 4
    </Tag>
  </div>
  ),
};

const allProps = {
  ...defaultProps,
  ...topProps,
  ...bottomProps,
  ...sideProps,
  ...extraProps,
};

const storyRender = component =>
  <div>
    <div style={{
      color: '#fff',
      width: '100%',
      backgroundColor: 'black',
      height: '86px',
      padding: '1rem',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '9999',
    }}>Header to simulate Bluemix top nav</div>
    {component}
    <h1 style={{
      marginTop: '10rem',
      marginBottom: '1rem',
    }}>This is sample content to test the page</h1>
    <div style={{
      backgroundColor: 'rgba(61, 112, 178, 0.1)',
      height: '30rem',
      padding: '1rem',
    }}>
      <p>Sample content to test scrolling</p>
    </div>
  </div>;

storiesOf('DetailPageHeaderCustom', module)
  .addDecorator(story => (
    <div style={{ minWidth: '60em' }}>
      {story()}
    </div>
  ))
  .addWithInfo('Default', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...defaultProps}
      />
    )
  ))
  .addWithInfo('With Top', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...topProps}
      />
    )
  ))
  .addWithInfo('With Bottom', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...bottomProps}
      />
    )
  ))
  .addWithInfo('With Side', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...sideProps}
      />
    )
  ))
  .addWithInfo('With Extra', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...extraProps}
      />
    )
  ))
  .addWithInfo('With Bottom and Side', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...{
          ...bottomProps,
          ...sideProps,
        }}
      />
    )
  ))
  .addWithInfo('With Top and Side', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...{
          ...topProps,
          ...sideProps,
        }}
      />
    )
  ))
  .addWithInfo('With Everything', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...allProps}
      />
    )
  ))
  .addWithInfo('Lock Expanded', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...{
          ...allProps,
          lockState: 'expanded',
        }}
      />
    )
  )).addWithInfo('Lock Collapsed', () => (
    storyRender(
      <DetailPageHeaderCustom
        {...{
          ...allProps,
          lockState: 'collapsed',
        }}
      />
    )
  ));

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

storiesOf('DetailPageHeaderCustom', module)
  .addDecorator(story => (
    <div style={{ minWidth: '60em' }}>
      {story()}
    </div>
  ))
  .addWithInfo('Default', () => (
    <DetailPageHeaderCustom
      {...defaultProps}
    />
  ))
  .addWithInfo('With Top', () => (
    <DetailPageHeaderCustom
      {...topProps}
    />
  ))
  .addWithInfo('With Bottom', () => (
    <DetailPageHeaderCustom
      {...bottomProps}
    />
  ))
  .addWithInfo('With Side', () => (
    <DetailPageHeaderCustom
      {...sideProps}
    />
  ))
  .addWithInfo('With Extra', () => (
    <DetailPageHeaderCustom
      {...extraProps}
    />
  ))
  .addWithInfo('With Bottom and Side', () => (
    <DetailPageHeaderCustom
      {...{
        ...bottomProps,
        ...sideProps,
      }}
    />
  ))
  .addWithInfo('With Top and Side', () => (
    <DetailPageHeaderCustom
      {...{
        ...topProps,
        ...sideProps,
      }}
    />
  ))
  .addWithInfo('With Everything', () => (
    <DetailPageHeaderCustom
      {...allProps}
    />
  ))
  .addWithInfo('Lock Expanded', () => (
    <DetailPageHeaderCustom
      {...{
        ...allProps,
        lockState: 'expanded',
      }}
    />
  )).addWithInfo('Lock Collapsed', () => (
    <DetailPageHeaderCustom
      {...{
        ...allProps,
        lockState: 'collapsed',
      }}
    />
  ));

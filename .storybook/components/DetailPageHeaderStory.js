import React from 'react';
import { action, storiesOf } from '@storybook/react';
import Breadcrumb from '../../components/Breadcrumb';
import BreadcrumbItem from '../../components/BreadcrumbItem';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';
import DetailPageHeader from '../../components/DetailPageHeader';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import Icon from '../../components/Icon';
import Tag from '../../components/Tag';
import Link from '../../components/Link';

const detailPageHeaderProps = {
  title: 'Detail Page Header',
  statusText: 'Running',
};

const overflowMenuProps = {
  onClick: action('onClick'),
  className: 'some-class',
  flipped: true,
};

const overflowMenuItemProps = {
  onClick: action('onClick'),
  className: 'some-class',
};

storiesOf('DetailPageHeader', module)
  .addDecorator(story => (
    <div style={{ minWidth: '60em' }}>
      {story()}
    </div>
  ))
  .addWithInfo('without tabs', () => (
    <div>
      <DetailPageHeader {...detailPageHeaderProps}>
        <Icon name="watson" />
        <Breadcrumb>
          <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
        </Breadcrumb>
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
          Language
        </Tag>
        <Link href="#">
          View demo
        </Link>
      </DetailPageHeader>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
    </div>
  ))
  .addWithInfo('with tabs', () => (
    <div>
      <div style={{
        width: '100%',
        backgroundColor: 'black',
        height: '86px',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '9999',
      }}></div>
      <DetailPageHeader {...detailPageHeaderProps} hasTabs>
        <Icon name="watson" />
        <Breadcrumb>
          <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
          <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
        </Breadcrumb>
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
            isLastItem
          />
        </OverflowMenu>
        <Tabs>
          <Tab label="Overview" />
          <Tab label="Apple" />
          <Tab label="Banana" />
          <Tab label="Orange" />
        </Tabs>
        <Tag type="ibm">
          Language
        </Tag>
        <Link href="#">
          View demo
        </Link>
      </DetailPageHeader>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
      <p>Hello sjdfl ksajfkl ;sjaf ;jdksl;f jak ;sjdklf;jdsklafjdsaf;jdskfl;sjf</p>
    </div>
  ));

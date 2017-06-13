import React from 'react';
import { storiesOf, action } from '@storybook/react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListContent,
  StructuredListCell,
} from '../../components/StructuredList';
import SelectItem from '../../components/SelectItem';
import SelectItemGroup from '../../components/SelectItemGroup';

const selectProps = {
  onClick: () => {
    action('click');
  }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('StructuredList', module).addWithInfo(
  'Simple',
  `
      description here
    `,
  () =>
    <StructuredListWrapper border={false}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>service</StructuredListCell>
          <StructuredListCell head>type</StructuredListCell>
          <StructuredListCell head>description</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell noWrap>
            Apache Spark
          </StructuredListCell>
          <StructuredListCell>IBM</StructuredListCell>
          <StructuredListCell>
            <StructuredListContent>
              Apache Spark is an open source cluster computing framework optimized for
              extremely fast and large scale data processing,
              which you can access via the newly integrated notebook interface IBM Analytics
              for Apache Spark.
            </StructuredListContent>
          </StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>
            Cloudant
          </StructuredListCell>
          <StructuredListCell>
            <StructuredListContent>IBM</StructuredListContent>
          </StructuredListCell>
          <StructuredListCell>
            <StructuredListContent>
              Cloudant NoSQL DB is a fully managed data layer designed for modern web and
              mobile applications that leverages a
              flexible JSON schema.
            </StructuredListContent>
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
);

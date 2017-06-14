import React from 'react';
import { storiesOf, action } from '@storybook/react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../../components/StructuredList';

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
            Apache Spark is an open source cluster computing framework optimized for
            extremely fast and large scale data processing,
            which you can access via the newly integrated notebook interface IBM Analytics
            for Apache Spark.
          </StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>
            Cloudant
          </StructuredListCell>
          <StructuredListCell>
            IBM
          </StructuredListCell>
          <StructuredListCell>
            Cloudant NoSQL DB is a fully managed data layer designed for modern web and
            mobile applications that leverages a
            flexible JSON schema.
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
);

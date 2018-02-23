/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import DataTooltip from '../DataTooltip';

storiesOf('DataTooltip', module)
  .addWithInfo(
    'Small',
    `
       There are three different types of Tooltips: Small, Medium, and Large. Tooltips appear above or below a data representation depending on the use case. The quantitative value on the Tooltip corresponds to the numerical value that the data representation is depicting. Choose the type of Tooltip that is the best fit for your data set based on the descriptions below.
       Use the Small Tooltip when there is one data set. Since only one set of data is being shown, the label and color border are not necessary.
    `,
    () => <DataTooltip value={'$250.17'} />
  )
  .addWithInfo(
    'Medium',
    `
      There are three different types of Tooltips: Small, Medium, and Large. Tooltips appear above or below a data representation depending on the use case. The quantitative value on the Tooltip corresponds to the numerical value that the data representation is depicting. Choose the type of Tooltip that is the best fit for your data set based on the descriptions below.
      The Medium Tooltip is used in scenarios where two or more sets of data are being compared. The top border color on the Tooltip should match the color of the data it is representing, as shown in the key. The label can either be referring to the corresponding name in the key or the intersecting data increment on the x-axis. Whichever you choose, make sure the labels are consistent across all Tooltips.
    `,
    () => (
      <DataTooltip
        size="medium"
        value={'$250.17'}
        label="Jan"
        color="#3b1a40"
      />
    )
  )
  .addWithInfo(
    'Large (one column)',
    `
      There are three different types of Tooltips: Small, Medium, and Large. Tooltips appear above or below a data representation depending on the use case. The quantitative value on the Tooltip corresponds to the numerical value that the data representation is depicting. Choose the type of Tooltip that is the best fit for your data set based on the descriptions below.
      The Large Tooltip is used when there are multiple data sets represented in a particular data increment. For example, a Line Graph may have several lines passing through one data increment or increment range. All of these data points need to be shown in the Tooltip on hover. The top label describes the data increment being shown while additional labels correspond to the name of the data value in the key. The left side border's color should match the color of the data it is representing, as shown in the key.
    `,
    () => (
      <DataTooltip
        size="large"
        data={[
          { label: "Torchy's", value: '$250.17', color: '#3b1a40' },
          { label: 'Tacodeli', value: '$250.17', color: '#473793' },
          { label: 'Veracruz', value: '$250.17', color: '#3c6df0' },
        ]}
        label="January"
      />
    )
  )
  .addWithInfo(
    'Large (two columns)',
    `
      There are three different types of Tooltips: Small, Medium, and Large. Tooltips appear above or below a data representation depending on the use case. The quantitative value on the Tooltip corresponds to the numerical value that the data representation is depicting. Choose the type of Tooltip that is the best fit for your data set based on the descriptions below.
      The Large Tooltip is used when there are multiple data sets represented in a particular data increment. For example, a Line Graph may have several lines passing through one data increment or increment range. All of these data points need to be shown in the Tooltip on hover. The top label describes the data increment being shown while additional labels correspond to the name of the data value in the key. The left side border's color should match the color of the data it is representing, as shown in the key.
    `,
    () => (
      <DataTooltip
        size="large"
        data={[
          { label: "Torchy's", value: '$250.17', color: '#3b1a40' },
          { label: 'Tacodeli', value: '$250.17', color: '#473793' },
          { label: 'Veracruz', value: '$250.17', color: '#3c6df0' },
          { label: 'Pueblo Viejo', value: '$250.17', color: '#00a68f' },
          { label: 'Las Trancas', value: '$250.17', color: '#48d4bb' },
          { label: 'Taco Joint', value: '$250.17', color: '#9b82f3' },
        ]}
        label="January"
      />
    )
  );

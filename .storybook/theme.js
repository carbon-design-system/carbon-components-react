import { create } from '@storybook/theming';

export default create({
  // Is this a 'light' or 'dark' theme?
  base: 'dark',

  // Color palette
  colorPrimary: '#0062ff', // primary color
  colorSecondary: '#3d3d3d', // secondary color

  // UI
  appBg: '#171717',
  appContentBg: '#282828',
  appBorderColor: '#6f6f6f',
  appBorderRadius: 4,

  // Fonts
  fontBase: "'IBM Plex Sans', Arial, sans-serif",
  fontCode: 'Monaco, monospace',

  // Text colors
  textColor: '#f3f3f3',
  textInverseColor: 'green',

  // Toolbar default and active colors
  barTextColor: '#bebebe',
  barSelectedColor: '#f3f3f3',
  barBg: '#171717',

  // Form colors
  inputBg: '#171717',
  inputBorder: 'rgba(0,0,0,.1)',
  inputTextColor: '#f3f3f3',
  inputBorderRadius: 0,

  // Brand logo/text
  brandTitle: `Carbon Components React`,
  brandUrl: `https://github.com/IBM/carbon-components-react`,
  brandImage: `Carbon Components React`,
});

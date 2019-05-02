import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { configureActions } from '@storybook/addon-actions';
import { initializeRTL } from 'storybook-addon-rtl';
// import { checkA11y } from 'storybook-addon-a11y';
import { addLocaleData } from 'react-intl';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import enLocaleData from 'react-intl/locale-data/en';
import faLocaleData from 'react-intl/locale-data/fa';

import Container from './Container';

addLocaleData(enLocaleData);
addLocaleData(faLocaleData);

const locales = ['en', 'fa'];

// Locale messages
const messages = {};
locales.forEach(locale => {
  messages[locale] = require(`./locales/${locale}.js`).default;
});

const getMessages = locale => messages[locale];

// Set intl configuration
setIntlConfig({
  locales,
  defaultLocale: locales[0],
  getMessages,
});

// Register decorator
addDecorator(withIntl);

addDecorator(
  withInfo({
    maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
  })
);

addDecorator(
  withOptions({
    name: `carbon components react`,
    url: 'https://github.com/IBM/carbon-components-react',
  })
);

configureActions({
  depth: 100,
  limit: 20,
});

addDecorator(story => <Container story={story} />);
// addDecorator(checkA11y);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

initializeRTL();

configure(loadStories, module);

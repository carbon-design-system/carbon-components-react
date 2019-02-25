import semver from 'semver';
import warning from 'warning';
import React from 'react';
import { breakingChangesX } from '../internal/FeatureFlags';

/* #__PURE__ */ (() => {
  if (__DEV__ && breakingChangesX && semver.lt(React.version, '16.8.2')) {
    warning(
      false,
      'The next major release of `carbon-components-react` requires ' +
        '`16.8.2` or greater version of `react` library.'
    );
  }
})();

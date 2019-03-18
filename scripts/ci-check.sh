#!/bin/sh

set -e

yarn prettier:diff
yarn lint
yarn test --runInBand
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i.orig -E 's/export *const *(components|breakingChanges)X *= *false/export const \1X = true/g' src/internal/FeatureFlags.js
else
  sed -i.orig -r 's/export *const *(components|breakingChanges)X *= *false/export const \1X = true/g' src/internal/FeatureFlags.js
fi
yarn test --runInBand --updateSnapshot
mv src/internal/FeatureFlags.js.orig src/internal/FeatureFlags.js
yarn test-ssr

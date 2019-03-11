#!/bin/sh

set -e

yarn prettier:diff
yarn lint
yarn test --runInBand
cp src/internal/FeatureFlags.js src/internal/FeatureFlags.js.orig
sed -i -r 's/export *const *(components|breakingChanges)X *= *false/export const \1X = true/g' src/internal/FeatureFlags.js
yarn test --runInBand --updateSnapshot
mv src/internal/FeatureFlags.js.orig src/internal/FeatureFlags.js
yarn test-ssr

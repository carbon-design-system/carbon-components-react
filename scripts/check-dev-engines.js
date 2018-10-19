/**
 * Inspired by:
 * https://github.com/facebook/fbjs/blob/8d416cbc0d6d37998afb9fb4f0af2c878f89726b/packages/fbjs-scripts/node/check-dev-engines.js#L1
 */
'use strict';

const fs = require('fs');
const assert = require('assert');
const exec = require('child_process').exec;
const semver = require('semver');
const f = require('util').format;

// Make sure we have a package.json to parse. Take it as the first argument
// (actually the 3rd for argv).
assert(
  process.argv.length >= 3,
  'Expected to receive a package.json file argument to parse'
);

const packageFilePath = process.argv[2];
let packageData;
try {
  const packageFile = fs.readFileSync(packageFilePath, { encoding: 'utf-8' });
  packageData = JSON.parse(packageFile);
} catch (e) {
  assert(
    false,
    f(
      'Expected to be able to parse %s as JSON but we got this error instead: %s',
      packageFilePath,
      e
    )
  );
}

const devEngines = packageData.devEngines;

if (devEngines.node !== undefined) {
  // First check that devEngines are valid semver
  assert(
    semver.validRange(devEngines.node),
    f('devEngines.node (%s) is not a valid semver range', devEngines.node)
  );
  // Then actually check that our version satisfies
  const nodeVersion = process.versions.node;
  assert(
    semver.satisfies(nodeVersion, devEngines.node),
    f(
      'Current node version is not supported for development, expected "%s" to satisfy "%s".',
      nodeVersion,
      devEngines.node
    )
  );
}

if (devEngines.npm !== undefined) {
  // First check that devEngines are valid semver
  assert(
    semver.validRange(devEngines.npm),
    f('devEngines.npm (%s) is not a valid semver range', devEngines.npm)
  );

  // Then actually check that our version satisfies
  exec('npm --version', function(err, stdout, stderr) {
    assert(err === null, f('Failed to get npm version... %s'), stderr);

    const npmVersion = stdout.trim();
    assert(
      semver.satisfies(npmVersion, devEngines.npm),
      f(
        'Current npm version is not supported for development, expected "%s" to satisfy "%s".',
        npmVersion,
        devEngines.npm
      )
    );
  });
}

if (devEngines.yarn !== undefined) {
  // First check that devEngines are valid semver
  assert(
    semver.validRange(devEngines.yarn),
    f('devEngines.yarn (%s) is not a valid semver range', devEngines.yarn)
  );

  // Then actually check that our version satisfies
  exec('yarn --version', function(err, stdout, stderr) {
    assert(err === null, f('Failed to get yarn version... %s'), stderr);

    const yarnVersion = stdout.trim();
    assert(
      semver.satisfies(yarnVersion, devEngines.yarn),
      f(
        'Current yarn version is not supported for development, expected "%s" to satisfy "%s".',
        yarnVersion,
        devEngines.yarn
      )
    );
  });
}

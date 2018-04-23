'use strict';

const commitAnayzer = require('@semantic-release/commit-analyzer');

const reCommit = /^release(\(([\w$.\-* ]*)\))?:/i;

module.exports = async (pluginConfig, { commits, logger }) => {
  // eslint-disable-next-line no-console
  console.log(
    `Commits:\n${commits
      .map(({ message }) => message.split('\n')[0])
      .reverse()
      .join('\n')}`
  );
  return commits.every(({ message }) => !reCommit.test(message))
    ? null
    : commitAnayzer(pluginConfig, { commits, logger });
};

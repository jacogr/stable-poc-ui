#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2

var ghpages = require('gh-pages');

const repo = `https://${process.env.GH_PAT}@github.com/${process.env.GITHUB_REPOSITORY}.git`;

ghpages.publish('build', { dest: '.', repo }, (error) => {
  if (error) {
    process.stderr.write(`${error.message}\n`, () => process.exit(1));
  } else {
    process.stdout.write('Published\n');
  }
});

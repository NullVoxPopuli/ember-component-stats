#!/usr/bin/env node
'use strict';

import { walkSync } from 'walk';
import { join } from 'path';
import cla from 'command-line-args';

import { printComponentInvocationStats } from './printing';
import { COMPONENT_INVOCATIONS, gatherInfoOnFile } from './gather';

const optionDefinitions = [
  { name: 'ignore', alias: 'i', type: String, multiple: true },
  { name: 'path', alias: 'p', type: String, multiple: false, default: 'app/' },
];

const options = cla(optionDefinitions);
const { path: _searchPath, ignore } = options;

const searchPath = join(process.cwd(), _searchPath);

function printStats() {
  printComponentInvocationStats(COMPONENT_INVOCATIONS);
}

walkSync(searchPath, {
  followLinks: true,
  filters: [...(ignore || []), 'tests', 'tmp', '.git'],
  listeners: {
    file(root, fileStats, next) {
      gatherInfoOnFile(root, fileStats);

      next();
    },
    errors(root, nodeStats, next) {
      console.log(root, nodeStats);
      next();
    },
    end() {
      printStats();
      console.log('end');
    },
  },
});

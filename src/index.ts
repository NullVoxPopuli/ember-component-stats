#!/usr/bin/env node
'use strict';

import { walkSync } from 'walk';
import { join } from 'path';
import cla from 'command-line-args';

import { gatherInfoOnFile } from './gather';
import { printStats } from './printing';

const optionDefinitions = [
  { name: 'ignore', alias: 'i', type: String, multiple: true },
  {
    name: 'path',
    alias: 'p',
    type: String,
    multiple: false,
    defaultValue: 'app/',
  },
];

const options = cla(optionDefinitions);
const { path: _searchPath, ignore } = options;

const searchPath = join(process.cwd(), _searchPath);

walkSync(searchPath, {
  followLinks: true,
  filters: [...(ignore || []), 'tests', 'tmp', '.git'],
  listeners: {
    file(root, fileStats, next) {
      gatherInfoOnFile(root, fileStats, searchPath);

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

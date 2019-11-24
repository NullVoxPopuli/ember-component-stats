#!/usr/bin/env node
'use strict';

import { walkSync } from 'walk';
import { readFileSync } from 'fs';
import { join } from 'path';
import cla from 'command-line-args';

import { printComponentInvocationStats } from './printing';
import { gatherComponentInvocations, COMPONENT_INVOCATIONS } from './gather';

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
      const { name } = fileStats;
      const filePath = join(root, name);
      const contents = readFileSync(filePath, 'utf8');
      const pathParts = filePath.split('.');
      const ext = pathParts[pathParts.length - 1];

      const fileInfo = { ext, contents };

      gatherComponentInvocations(fileInfo);

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

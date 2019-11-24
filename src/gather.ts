import { readFileSync } from 'fs';
import { searchAndExtract } from 'extract-tagged-template-literals';
import { WalkStats } from 'walk';
import { join } from 'path';

import { componentsInContent } from './utils';
import { ComponentInvocations, FileInfo } from './types';

export const COMPONENT_INVOCATIONS: ComponentInvocations = {};

export function gatherInfoOnFile(root: string, fileStats: WalkStats) {
  const { name } = fileStats;
  const filePath = join(root, name);
  const contents = readFileSync(filePath, 'utf8');
  const pathParts = filePath.split('.');
  const ext = pathParts[pathParts.length - 1];

  const fileInfo = { ext, contents };

  gatherComponentInvocations(fileInfo);
}

export function gatherComponentInvocations({ ext, contents }: FileInfo) {
  if (ext !== 'hbs') {
    // let hbs = searchAndExtractHbs(contents);
    const hbs = searchAndExtract(contents, 'hbs');

    contents = hbs;
  }

  const components = componentsInContent(contents);

  for (const componentName of components) {
    const existing = COMPONENT_INVOCATIONS[componentName] || 0;
    COMPONENT_INVOCATIONS[componentName] = existing + 1;
  }
}

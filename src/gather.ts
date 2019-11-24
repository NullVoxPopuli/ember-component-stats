import { readFileSync } from 'fs';
import { searchAndExtract } from 'extract-tagged-template-literals';
import { WalkStats } from 'walk';
import { join } from 'path';

import { componentsInContent } from './utils';
import {
  ComponentInvocations,
  FileInfo,
  ComponentInfo,
  ComponentInfos,
} from './types';

export const COMPONENTS: ComponentInfos = {};
export const COMPONENT_INVOCATIONS: ComponentInvocations = {};

export function gatherInfoOnFile(
  root: string,
  fileStats: WalkStats,
  searchPath: string,
) {
  const { name } = fileStats;
  const filePath = join(root, name);
  const contents = readFileSync(filePath, 'utf8');
  const pathParts = filePath.split('.');
  const ext = pathParts[pathParts.length - 1];
  const fileName = name.replace(new RegExp(`.${ext}$`), '');
  const location = root.replace(new RegExp(`^${searchPath}`), '');

  const fileInfo = { ext, location, filePath, fileName, contents };

  gatherComponentInvocations(fileInfo);
  gatherComponentInfo(fileInfo);
}

export function gatherComponentInfo({
  ext,
  filePath,
  fileName,
  location,
}: FileInfo) {
  const isJs = ext === 'js' || ext === 'ts';
  const isHbs = ext === 'hbs';

  if (!isJs && !isHbs) {
    return;
  }

  if (!filePath.includes('components')) {
    return;
  }

  const isComponentJs =
    // pods
    fileName === 'component' ||
    // nested component structure
    fileName === 'index';

  const isTemplate =
    // pods
    fileName === 'template' ||
    // nested component structure
    fileName === 'index';

  if (!isTemplate && !isComponentJs) {
    // console.log(filePath, fileName);
    return;
  }

  const existing: ComponentInfo = COMPONENTS[location] || {};

  if (isComponentJs) {
    existing.js = fileName;
  }

  if (isTemplate) {
    existing.hbs = fileName;
  }

  COMPONENTS[location] = existing;
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

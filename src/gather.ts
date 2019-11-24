import { componentsInContent } from './utils';
import { searchAndExtract } from 'extract-tagged-template-literals';
import { ComponentInvocations, FileInfo } from './types';

export const COMPONENT_INVOCATIONS: ComponentInvocations = {};

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

import {
  numberOfComponentsByInvocationCount,
  templateOnlyUsage,
} from './stats';
import { ComponentInvocations, ComponentInfos } from './types';
import { COMPONENT_INVOCATIONS, COMPONENTS } from './gather';

export function printStats() {
  printComponentInvocationStats(COMPONENT_INVOCATIONS);
  printTemplateOnlyUsage(COMPONENTS);
}

function printComponentInvocationStats(
  componentInvocations: ComponentInvocations,
) {
  const result = numberOfComponentsByInvocationCount(componentInvocations);

  console.table(result);
}

function printTemplateOnlyUsage(components: ComponentInfos) {
  const result = templateOnlyUsage(components);

  console.table(result);
}

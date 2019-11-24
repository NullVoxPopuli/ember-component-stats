import { numberOfComponentsByInvocationCount } from './stats';
import { ComponentInvocations } from './types';

export function printComponentInvocationStats(
  componentInvocations: ComponentInvocations,
) {
  console.table(componentInvocations);

  const result = numberOfComponentsByInvocationCount(componentInvocations);

  console.table(result);
}

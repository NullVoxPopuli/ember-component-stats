import { ComponentInvocations } from './types';
import { PERCENT, DECIMAL } from './constants';

type GroupByCount = { [count: number]: string[] };
type InvocationStat = {
  numberOfComponents: number;
  percentOfTotal: number;
};
type StatResult = { [num: number]: InvocationStat };

export function numberOfComponentsByInvocationCount(
  componentInvocations: ComponentInvocations,
) {
  const totalComponents = Object.keys(componentInvocations).length;

  const groupByCount: GroupByCount = {};

  Object.entries(componentInvocations).forEach(([componentName, count]) => {
    groupByCount[count] = groupByCount[count] || [];
    groupByCount[count].push(componentName);
  });

  const numComponentsByInvocation: StatResult = {};

  for (const count of Object.keys(groupByCount)) {
    const components = groupByCount[(count as unknown) as number];

    numComponentsByInvocation[
      (count as unknown) as number
    ] = numComponentsByInvocation[(count as unknown) as number] || {
      numberOfComponents: 0,
      percentOfTotal: -1,
    };
    numComponentsByInvocation[
      (count as unknown) as number
    ].numberOfComponents += components.length;
  }

  Object.entries(numComponentsByInvocation).forEach(([count, data]) => {
    numComponentsByInvocation[(count as unknown) as number].percentOfTotal =
      Math.round(
        (data.numberOfComponents / totalComponents) * PERCENT * DECIMAL,
      ) / DECIMAL;
  });

  return numComponentsByInvocation;
}

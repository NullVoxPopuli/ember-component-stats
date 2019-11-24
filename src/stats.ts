import { ComponentInvocations, ComponentInfos } from './types';
import { PERCENT, DECIMAL } from './constants';

const NUMBER_OF_INVOCATIONS = '# Invocations';
const NUMBER_OF_COMPONENTS = '# Components';
const PERCENT_OF_TOTAL = '% of Total';

type GroupByCount = { [count: string]: string[] };
type InvocationStat = {
  [NUMBER_OF_COMPONENTS]: number;
  [NUMBER_OF_INVOCATIONS]: number;
  [PERCENT_OF_TOTAL]: number;
};
type StatResult = { [num: string]: InvocationStat };

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

  Object.entries(groupByCount).forEach(([count, components]) => {
    numComponentsByInvocation[count] = numComponentsByInvocation[count] || {
      [NUMBER_OF_INVOCATIONS]: count,
      [NUMBER_OF_COMPONENTS]: 0,
      [PERCENT_OF_TOTAL]: -1,
    };
    numComponentsByInvocation[count][NUMBER_OF_COMPONENTS] += components.length;
  });

  Object.entries(numComponentsByInvocation).forEach(([count, data]) => {
    numComponentsByInvocation[(count as unknown) as number][PERCENT_OF_TOTAL] =
      Math.round(
        (data[NUMBER_OF_COMPONENTS] / totalComponents) * PERCENT * DECIMAL,
      ) / DECIMAL;
  });

  return numComponentsByInvocation;
}

export function templateOnlyUsage(components: ComponentInfos) {
  let numTO = 0;
  let numJS = 0;
  let numBoth = 0;

  Object.entries(components).forEach(([_name, info]) => {
    if (info.js && info.hbs) {
      return numBoth++;
    }

    if (info.js) {
      return numJS++;
    }

    if (info.hbs) {
      return numTO++;
    }

    return; // directory or file we don't care about
  });

  return {
    ['Total Components']: numTO + numJS + numBoth,
    ['# Template Only']: numTO,
    ['# Class Only']: numJS,
    ['# Class & Template']: numBoth,
  };
}

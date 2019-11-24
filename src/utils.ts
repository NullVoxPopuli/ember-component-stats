const COMPONENT_REGEX = /<([A-Z][\w:]+)([.]+)?(>|(\/>)?)[^(]?/g;

export function componentsInContent(contents: string) {
  const result = [];
  const matches = contents.matchAll(COMPONENT_REGEX);

  for (const match of matches) {
    const componentName = match[1];

    result.push(componentName);
  }

  return result;
}

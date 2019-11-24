// export type Dict<K extends number = number, V = string> = {
//   [key: K]: V;
// };

export type ComponentInvocations = {
  [componentName: string]: number;
};

export type FileInfo = {
  ext: string;
  contents: string;
};

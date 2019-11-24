// export type Dict<K extends number = number, V = string> = {
//   [key: K]: V;
// };

export type ComponentInfo = {
  js?: string;
  hbs?: string;
};

export type ComponentInfos = {
  [componentName: string]: ComponentInfo;
};

export type ComponentInvocations = {
  [componentName: string]: number;
};

export type FileInfo = {
  ext: string;
  location: string;
  filePath: string;
  fileName: string;
  contents: string;
};

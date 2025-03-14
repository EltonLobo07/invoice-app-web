export type OmitKey<TObj, TExcluded extends keyof TObj> = Omit<TObj, TExcluded>;

export type CustomProps<TObj extends Record<string, unknown>> = {
  [K in keyof TObj as K extends string ? `$${K}` : K]: TObj[K];
};

export type HeadingLvl = 1 | 2 | 3 | 4 | 5 | 6;

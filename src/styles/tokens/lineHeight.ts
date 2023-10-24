import { vars } from '@seed-design/design-token';

export type LineHeight = Record<
  `$static.${keyof typeof vars.$static.lineHeight}`,
  string
>;

export const lineHeight = Object.entries(vars.$static.lineHeight).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [`$static.${k}`]: v,
  }),
  {} as LineHeight,
);

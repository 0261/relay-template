import { vars } from '@seed-design/design-token';

export type FontWeight = Record<
  `$static.${keyof typeof vars.$static.fontWeight}`,
  string
>;

export const fontWeight = Object.entries(vars.$static.fontWeight).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [`$static.${k}`]: v,
  }),
  {} as FontWeight,
);

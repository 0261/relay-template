import { vars } from '@seed-design/design-token';

export type FontSize = Record<
  `$scale.${keyof typeof vars.$scale.dimension}`,
  string
>;

export const fontSize = Object.entries(vars.$scale.dimension).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [`$scale.${k}`]: v,
  }),
  {} as FontSize,
);

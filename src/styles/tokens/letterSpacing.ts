import { vars } from '@seed-design/design-token';

export type LetterSpacing = Record<
  `$scale.${keyof typeof vars.$scale.letterSpacing}`,
  string
>;

export const letterSpacing = Object.entries(vars.$scale.letterSpacing).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [`$scale.${k}`]: v,
  }),
  {} as LetterSpacing,
);

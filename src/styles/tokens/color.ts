import { vars } from '@seed-design/design-token';

export type ScaleColor = Record<
  `$scale.${keyof typeof vars.$scale.color}`,
  string
>;
export type SemanticColor = Record<
  `$semantic.${keyof typeof vars.$semantic.color}`,
  string
>;
export type StaticColor = Record<
  `$static.${keyof typeof vars.$static.color}`,
  string
>;

const scaleColor = Object.entries(vars.$scale.color).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [`$scale.${k}`]: v,
  }),
  {} as ScaleColor,
);

const semanticColor = Object.entries(vars.$semantic.color).reduce(
  (acc, [k, v]) => {
    return {
      ...acc,
      [`$semantic.${k}`]: v,
    };
  },
  {} as SemanticColor,
);

const staticColor = Object.entries(vars.$static.color).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [`$static.${k}`]: v,
  }),
  {} as StaticColor,
);

export const color = {
  ...scaleColor,
  ...semanticColor,
  ...staticColor,
};
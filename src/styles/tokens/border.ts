import type { StyleRule } from '@vanilla-extract/css';

import { color } from './color';

export type BorderKey =
  | 'none'
  | `all 1px solid ${keyof typeof color}`
  | `top 1px solid ${keyof typeof color}`
  | `bottom 1px solid ${keyof typeof color}`
  | `left 1px solid ${keyof typeof color}`
  | `right 1px solid ${keyof typeof color}`;

export type Border = {
  [key in BorderKey]: StyleRule;
};

export const border = Object.entries(color).reduce(
  (acc, [colorKey, colorValue]) => ({
    [`all 1px solid ${colorKey}`]: {
      border: `1px solid ${colorValue}`,
    },
    [`top 1px solid ${colorKey}`]: {
      borderTop: `1px solid ${colorValue}`,
    },
    [`bottom 1px solid ${colorKey}`]: {
      borderBottom: `1px solid ${colorValue}`,
    },
    [`left 1px solid ${colorKey}`]: {
      borderLeft: `1px solid ${colorValue}`,
    },
    [`right 1px solid ${colorKey}`]: {
      borderRight: `1px solid ${colorValue}`,
    },
    ...acc,
  }),
  {
    none: {
      border: 'none',
    },
  } as Border,
);

const primitiveSpacing = {
  '0'    : 0,
  '0px'  : 0,
  '1px'  : 1,
  '2px'  : 2,
  '4px'  : 4,
  '6px'  : 6,
  '8px'  : 8,
  '12px' : 12,
  '16px' : 16,
  '20px' : 20,
  '24px' : 24,
  '28px' : 28,
  '32px' : 32,
  '36px' : 36,
  '40px' : 40,
  '44px' : 44,
  '48px' : 48,
  '64px' : 64,
  '80px' : 80,
  '96px' : 96,
  '128px': 128,
};

export type Spacing = {
  [key in keyof typeof primitiveSpacing]: string;
};

export const spacing: Spacing = Object.entries(primitiveSpacing).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [k]: `${v / 16}rem`,
  }),
  {} as Spacing,
);

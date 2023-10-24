import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { border, color, fontSize, fontWeight, letterSpacing, lineHeight, media, spacing} from './tokens';

const props = defineProperties({
  conditions: {
    base: {},
    ...Object.entries(media).reduce<{
      [key in `@media${keyof typeof media}`]: {
        '@media': string;
      };
    }>(
      (acc, [key, value]) => ({
        ...acc,
        [`@media${key}`]: {
          '@media': value,
        },
      }),
      {} as { '@media(>small)': { '@media': string; }; '@media(>medium)': { '@media': string; }; '@media(>large)': { '@media': string; }; '@media(>xlarge)': { '@media': string; }; '@media(>xxlarge)': { '@media': string; }; },
    ),
    '&:hover': {
      selector: '&:hover',
    },
    '&:active': {
      selector: '&:active',
    },
  },
  defaultCondition: 'base',
  properties      : {
    /**
     * (Seed) Color Tokens
     */
    color,
    backgroundColor: color,

    /**
     * Border Tokens `[direction] 1px solid [seed-color-token]`
     */
    border,

    /**
     * (Seed) Typography Tokens
     */
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,

    /**
     * (Custom) Spacing Tokens
     */
    paddingTop   : spacing,
    paddingBottom: spacing,
    paddingLeft  : spacing,
    paddingRight : spacing,
    marginTop    : {
      ...spacing,
      auto: 'auto',
    },
    marginBottom: {
      ...spacing,
      auto: 'auto',
    },
    marginLeft: {
      ...spacing,
      auto: 'auto',
    },
    marginRight: {
      ...spacing,
      auto: 'auto',
    },
    width: {
      ...spacing,
      '100%': '100%',
      auto  : 'auto',
    },
    maxWidth: {
      ...spacing,
      '100%': '100%',
      auto  : 'auto',
    },
    height: {
      ...spacing,
      '100%': '100%',
      auto  : 'auto',
    },
    maxHeight: {
      ...spacing,
      '100%': '100%',
      auto  : 'auto',
    },
    gap: {
      ...spacing,
    },
    borderRadius: {
      ...spacing,
      '50%': '50%',
    },
    top: {
      ...spacing,
      '50%' : '50%',
      '100%': '100%',
      auto  : 'auto',
    },
    bottom: {
      ...spacing,
      '50%' : '50%',
      '100%': '100%',
      auto  : 'auto',
    },
    left: {
      ...spacing,
      '50%' : '50%',
      '100%': '100%',
      auto  : 'auto',
    },
    right: {
      ...spacing,
      '50%' : '50%',
      '100%': '100%',
      auto  : 'auto',
    },

    /**
     * CSS Properties
     */
    display: [
      'none',
      'block',
      'flex',
      'inline',
      'inline-flex',
      'inline-block',
      'grid',
    ],
    flexDirection : ['row', 'column'],
    flex          : ['1'],
    flexWrap      : ['wrap'],
    alignItems    : ['flex-start', 'center', 'flex-end'],
    justifyContent: [
      'flex-start', 'center', 'flex-end', 'space-between', 'space-around',
    ],
    textAlign: ['left', 'center', 'right'],
    cursor   : ['pointer', 'none'],
    overflowX: ['auto', 'scroll', 'hidden'],
    overflowY: ['auto', 'scroll', 'hidden'],
    position : ['relative', 'absolute', 'fixed', 'sticky'],
    transform: [
      'translateX(-50%)', 'translateY(-50%)', 'translate(-50%, -50%)',
    ],
    textDecoration: ['none', 'underline'],
    overflow      : ['auto', 'hidden', 'scroll', 'initial'],
    objectFit     : ['cover', 'contain', 'fill', 'initial'],
    whiteSpace    : [
      'pre-wrap', 'pre-line', 'break-spaces', 'nowrap', 'normal', 'initial',
    ],
    opacity  : ['0', '1'],
    boxSizing: ['content-box'],
  },
  shorthands: {
    padding   : ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX  : ['paddingLeft', 'paddingRight'],
    paddingY  : ['paddingTop', 'paddingBottom'],
    margin    : ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX   : ['marginLeft', 'marginRight'],
    marginY   : ['marginTop', 'marginBottom'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

export const sprinkles = createSprinkles(props);
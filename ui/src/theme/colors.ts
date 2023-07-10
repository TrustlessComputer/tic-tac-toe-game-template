import { DefaultTheme } from 'styled-components';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
};

export type ColorsTheme = DefaultTheme;

export const commonTheme = {
  ...colors,
  white: colors.white,
  black: colors.black,
  // colors system

  dark: {
    '120': '#010101',
    '110': '#0F0F0F',
    '100': '#1C1C1C',
    '80': '#2E2E2E',
    '60': '#5B5B5B',
    '40': '#898989',
    '20': '#B6B6B6',
    '10': '#CECECE',
    '5': '#ECECED',
  },

  light: {
    '100': '#FFFFFF',
    '80': '#FAFAFA',
    '60': '#F4F4F4',
    '40': '#EFEFEF',
    '20': '#E9E9E9',
    '10': '#E7E7E7',
    '5': '#E5E5E5',
  },

  blue: {
    A: '#4281f8',
    B: '#7bd9d7',
  },

  yellow: {
    A: '#f99d17',
    B: '#fdb863',
    C: '#FFC702',
  },

  red: {
    A: '#FF4747',
    B: '#FF8B8B',
    C: '#FF6666',
  },
};

export const darkTheme = {
  ...commonTheme,

  'bg-primary': commonTheme.dark['100'],
  'bg-secondary': commonTheme.dark['80'],

  'btn-primary': commonTheme.yellow.C,

  'txt-primary': commonTheme.light['100'],
  'txt-secondary': commonTheme.light['60'],
  'txt-error': commonTheme.red.A,
  'txt-highlight': commonTheme.yellow.C,
  'txt-parallel': commonTheme.dark['100'],

  'txt-1': commonTheme.dark['100'],

  'border-primary': commonTheme.dark['60'],
  'border-secondary': commonTheme.yellow.C,

  'loader-primary': commonTheme.blue.A,
  'loader-secondary': commonTheme.blue.B,
};

export const lightTheme = {
  ...commonTheme,

  'bg-primary': commonTheme.light['100'],
  'bg-secondary': commonTheme.light['80'],

  'txt-primary': commonTheme.dark['100'],
  'txt-secondary': commonTheme.dark['60'],
  'txt-error': commonTheme.red.A,
  'txt-highlight': commonTheme.yellow['A'],
  'txt-parallel': commonTheme.light['100'],
  'txt-1': commonTheme.light['100'],

  'btn-primary': commonTheme.blue.A,

  'border-primary': commonTheme.dark['10'],
  'border-secondary': commonTheme.blue.A,

  'loader-primary': commonTheme.blue.A,
  'loader-secondary': commonTheme.blue.B,
};

import { DefaultTheme } from 'styled-components';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
};

export type ColorsTheme = DefaultTheme;

const commonTheme = {
  ...colors,
  white: colors.white,
  black: colors.black,
  // colors system
};

export const darkTheme = {
  ...commonTheme,
};

export const lightTheme = {
  ...commonTheme,
};

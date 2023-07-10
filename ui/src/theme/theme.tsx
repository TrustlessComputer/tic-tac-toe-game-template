import React, { useMemo } from 'react';
import { createGlobalStyle, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { getTheme } from '@/theme/index';
import { ScreenMarginTop } from '@/theme/css/margin.top';
import { ScreenMarginBottom } from '@/theme/css/margin.bottom';
import { ScreenMarginLeft } from '@/theme/css/margin.left';
import { ScreenMarginRight } from '@/theme/css/margin.right';
import { useAppSelector } from '@/state/hooks';
import { isDarkSelector } from '@/state/application/selector';
import BGImage from '@/images/background.jpg';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useAppSelector(isDarkSelector);
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode]);
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme['txt-primary']};
    background-image: url(${BGImage});
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center center;


    @media screen and (min-width: 1920px) {
      font-size: 18px;
    }

    @media screen and (min-width: 2048px) {
      font-size: 20px;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover{
        color: inherit;
        text-decoration: underline;
      }
    }

    ${ScreenMarginTop}
    ${ScreenMarginBottom}
    ${ScreenMarginLeft}
    ${ScreenMarginRight}
  }

  summary::-webkit-details-marker {
    display:none;
  }
`;

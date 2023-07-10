import styled from 'styled-components';
import { ColorsTheme } from '@/theme/colors';

const Row = styled.div<{
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  gap?: string;
  bgColor?: keyof ColorsTheme;
}>`
  width: ${({ width }) => width ?? '100%'};
  display: flex;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding || '0px'};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ bgColor, theme }) =>
    bgColor && ((theme as any)[bgColor] ? (theme as any)[bgColor] : 'transparent')};
  gap: ${({ gap }) => gap};
`;

export { Row };

import styled, { DefaultTheme, css } from 'styled-components';
import px2rem from '@/utils/px2rem';

export const StyledIconSVG = styled.div<any>`
  font-size: 0;
  svg {
    display: inline-block;
    vertical-align: middle;
    width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '100%')};
    height: ${props => (props.maxHeight ? `${props.maxHeight}px` : '100%')};
    pointer-events: none;
  }
  ${props => {
    return (
      props.type === 'fill' &&
      css`
        svg path,
        svg rect {
          fill: ${({ color, theme }: { color: string; theme: DefaultTheme }) =>
            (theme as any)[color] || 'currentColor'};
        }
      `
    );
  }};
  ${props => {
    return (
      props.type === 'stroke' &&
      css`
        svg path,
        svg rect {
          stroke: ${({ color, theme }: { color: string; theme: DefaultTheme }) =>
            (theme as any)[color] || 'currentColor'} !important;
        }
      `
    );
  }};
`;

export const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme['bg-primary']};
  padding: ${px2rem(4)};
  border-radius: ${px2rem(4)};
  :hover {
    opacity: 0.8;
  }
`;

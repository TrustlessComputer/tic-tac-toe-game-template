import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { BREAKPOINTS, MediaQueryBuilder } from '@/theme';

const PADDING = {
  SMALL: '16px',
  MEDIUM: '32px',
  LARGE: '60px',
};

const LayoutPadding = styled.div`
  padding-left: ${PADDING.SMALL};
  padding-right: ${PADDING.SMALL};
  @media screen and (min-width: ${BREAKPOINTS.md}) {
    padding-left: ${PADDING.MEDIUM};
    padding-right: ${PADDING.MEDIUM};
  }
  @media screen and (min-width: ${BREAKPOINTS.lg}) {
    padding-left: ${PADDING.LARGE};
    padding-right: ${PADDING.LARGE};
  }
`;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding-top: ${px2rem(12)};
`;

const ContentWrapperLG = css`
  max-width: 100vw;
`;

const ContentWrapper = styled(LayoutPadding)`
  display: flex;
  align-self: center;
  width: 100%;
  max-width: ${px2rem(2268)};
  ${MediaQueryBuilder('lg', ContentWrapperLG)}
`;

export { Container, ContentWrapper, LayoutPadding };

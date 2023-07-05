import styled, { css } from 'styled-components';
import { LayoutPadding } from '@/pages/layout/Layout.styled';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const MediaLarge = css`
  .balance-wrapper {
    display: none;
  }
`;

const MediaXl = css`
  .buttons {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Wrapper = styled(LayoutPadding)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-top: ${px2rem(24)};
  padding-bottom: ${px2rem(24)};
  max-width: ${px2rem(2268)};
  width: 100%;

  .ic-logo {
    width: ${px2rem(48)};
    height: ${px2rem(48)};
  }

  .buttons {
    max-width: 30vw;
    display: flex;
    justify-content: end;
  }

  ${MediaQueryBuilder('lg', MediaLarge)}
  ${MediaQueryBuilder('xxl', MediaXl)}
`;

export { Wrapper, Container };

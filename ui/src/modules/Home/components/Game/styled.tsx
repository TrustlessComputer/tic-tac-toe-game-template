import styled, { css } from 'styled-components';
import { NUMBER_COLUMN } from '@/configs';
import { opacify } from '@/theme/utils';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const ContainerMD = css`
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  max-width: calc(100vw - 32px);
  padding-bottom: 32px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MediaQueryBuilder('md', ContainerMD)}
`;

const GridContainerXXL = css`
  max-width: 100%;
`;

const GridContainerMD = css`
  // min-width: 170vw;
  min-width: 160vw;
  padding: 12px;
  border-width: 2px;
  border-radius: 24px;
  max-width: 100vw;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${NUMBER_COLUMN}, 1fr);
  height: fit-content;
  background-color: ${({ theme }) => opacify(50, theme.white)};
  border-radius: ${px2rem(50)};
  border: ${px2rem(15)} solid ${({ theme }) => opacify(10, theme.black)};
  padding: ${px2rem(16)};
  gap: ${px2rem(6)};
  position: relative;
  flex: 1;
  max-width: 38vw;
  min-width: 800px;
  ${MediaQueryBuilder('xxl', GridContainerXXL)}
  ${MediaQueryBuilder('md', GridContainerMD)}
`;

const AuthButton = styled.div`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Container, AuthButton, GridContainer };

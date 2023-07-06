import styled, { css } from 'styled-components';
import { NUMBER_COLUMN } from '@/configs';
import { opacify } from '@/theme/utils';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const ContainerXL = css`
  max-width: 100%;
`;

const Container = styled.div`
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
  max-width: 45vw;
  min-width: 800px;
  ${MediaQueryBuilder('xl', ContainerXL)}
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

export { Container, AuthButton };

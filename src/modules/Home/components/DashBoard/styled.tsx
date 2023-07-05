import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

const ContainerLG = css`
  flex: unset;
`;
const Container = styled.div`
  flex: 1;
  ${MediaQueryBuilder('lg', ContainerLG)}
`;

const ActionsXL = css`
  margin-top: 24px;
`;

const ActionsMD = css`
  flex-direction: column;
  gap: 16px;
`;

const Actions = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  margin-top: 120px;
  justify-content: center;
  ${MediaQueryBuilder('xl', ActionsXL)}
  ${MediaQueryBuilder('md', ActionsMD)}
`;

export { Container, Actions };

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
  flex-direction: row;
`;

const ActionsMD = css`
  gap: 16px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: 120px;
  gap: 32px;
  margin-left: auto;
  margin-right: auto;
  ${MediaQueryBuilder('xl', ActionsXL)}
  ${MediaQueryBuilder('md', ActionsMD)}
`;

export { Container, Actions };

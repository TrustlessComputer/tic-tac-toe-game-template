import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

const ContainerLG = css`
  flex-direction: column;
  gap: 32px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  ${MediaQueryBuilder('xl', ContainerLG)}
`;

export { Container };

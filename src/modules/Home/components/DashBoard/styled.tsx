import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import { opacify } from '@/theme/utils';

const ContainerLG = css`
  flex: unset;
`;
const Container = styled.div`
  flex: 1;
  ${MediaQueryBuilder('lg', ContainerLG)}
  .warning-wrapper {
    background: #fef3cd;
    border: 1px solid #ffeeba;
    padding: 12px 32px;
    border-radius: 4px;
    margin-bottom: 32px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    p {
      color: #856404;
      font-size: 18px;
    }
  }
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

const MatchContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 42px;
  margin-top: 120px;
  align-items: center;
`;

const PlayerBox = styled.div<{ isMyTurn: boolean; turnColor: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  background-color: ${({ theme, isMyTurn, turnColor }) =>
    isMyTurn ? opacify(20, turnColor) : opacify(20, theme['bg-secondary'])};
  border-radius: 4px;
  padding: 12px;
  width: 400px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

  .square-box {
    width: 65px;
    height: 65px;
  }

  .address-highlight {
    color: ${({ theme }) => theme['txt-highlight']};
    margin-right: 12px;
  }

  .moving-now {
    margin-top: 4px;
  }
`;

export { Container, Actions, MatchContent, PlayerBox };

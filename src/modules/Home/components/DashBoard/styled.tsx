import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import { opacify } from '@/theme/utils';
import px2rem from '@/utils/px2rem';

const ContainerLG = css`
  flex: unset;
`;
const Container = styled.div`
  margin-top: 120px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${MediaQueryBuilder('lg', ContainerLG)}
  .warning-wrapper {
    background: #fef3cd;
    border: 1px solid #ffeeba;
    padding: 12px 32px;
    border-radius: 4px;
    margin-top: 24px;

    width: 100%;

    p {
      color: #856404;
      font-size: 18px;
    }
  }
`;

const Box = styled.div`
  background-color: rgba(22, 26, 41, 0.5);
  min-width: ${px2rem(600)};
  margin-top: ${px2rem(24)};
  border-radius: ${px2rem(24)};
  padding: ${px2rem(24)};
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Banner = styled.img`
  border-radius: 12px;
`;

const ActionsXL = css`
  margin-top: 24px;
  flex-direction: row;
`;

const ActionsMD = css`
  gap: 16px;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  width: 100%;
  justify-content: space-between;

  ${MediaQueryBuilder('xl', ActionsXL)}
  ${MediaQueryBuilder('md', ActionsMD)}
`;

const MatchContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 42px;
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

export { Container, Actions, MatchContent, PlayerBox, Box, Banner };

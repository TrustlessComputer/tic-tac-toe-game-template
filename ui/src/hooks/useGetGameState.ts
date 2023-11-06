import useContractSigner from './useContractSigner';
import { IGameMapper, Player, WinnerState } from '@/interfaces/useGetGames';
import { IRole } from '@/interfaces/useGetGameSttate';
import flatten from 'lodash/flatten';
import { turnMapper } from '@/utils/turn';
import { gamesBuilder } from '@/utils/gameState';
import BigNumber from 'bignumber.js';

interface IGameState {
  squares: IRole[];
  newTurn: IRole;
  matchData: IGameMapper;
  turn: Player;
  timeLeftCurrTurn: string;
  isMatchEnd: boolean;
}

const useGetGameState = () => {
  const contractSigner = useContractSigner();

  const onGetGameState = async (gameID: string): Promise<IGameState> => {
    if (!gameID || !contractSigner) {
      throw new Error('Get game state error.');
    }
    const gameState = await contractSigner.getGameState(gameID);

    console.log('gameState__', gameState);

    const squares = flatten(gameState[0]).map((item: any) => {
      const value = item.toString();
      let data = IRole.Empty;
      switch (value) {
        case Player.Empty:
          data = IRole.Empty;
          break;
        case Player.Player1:
          data = IRole.X;
          break;
        case Player.Player2:
          data = IRole.O;
          break;
      }
      return data;
    });

    const player1Moved = squares.filter((item: any) => item === IRole.X).length;
    const player2Moved = squares.filter((item: any) => item === IRole.O).length;

    const turn = turnMapper(gameState[1]);
    const timeLeftCurrTurn = gameState[2].toString(); // seconds
    console.log('timeLeftCurrTurn___', timeLeftCurrTurn);

    let matchData = gamesBuilder(gameState[4]);

    console.log('matchData____', matchData);

    const isMatchEnd = new BigNumber(timeLeftCurrTurn).lt(0);
    console.log('isMatchEnd__', isMatchEnd);
    if (isMatchEnd && matchData.winner === WinnerState.Playing) {
      matchData = {
        ...matchData,
        winner: turn === Player.Player1 ? WinnerState.Player2 : WinnerState.Player1,
      };
    }

    console.log('LOGGER--- GAME STATE: ', {
      squares,
      turn,
      isMatchEnd,
      matchData,
      timeLeftCurrTurn,
    });

    return {
      squares,
      newTurn: player1Moved > player2Moved ? IRole.O : IRole.X,
      matchData,
      turn,
      timeLeftCurrTurn,
      isMatchEnd,
    };
  };

  return {
    onGetGameState,
  };
};

export default useGetGameState;

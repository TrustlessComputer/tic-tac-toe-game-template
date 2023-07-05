import useContractSigner from './useContractSigner';
import { Player } from '@/interfaces/useGetGames';
import { IRole } from '@/interfaces/useGetGameSttate';
import flatten from 'lodash/flatten';

const useGetGameState = () => {
  const contractSigner = useContractSigner();
  // getGameState
  const onGetGameState = async (gameID: string) => {
    if (!gameID || !contractSigner) return undefined;
    const gameState = await contractSigner.getGameState(gameID);

    const squares = flatten(gameState).map((item: any) => {
      const value = item.toString();
      let data = '';
      switch (value) {
        case Player.Empty:
          data = IRole.Empty;
          break;
        case Player.Player1:
          data = IRole.Player1;
          break;
        case Player.Player2:
          data = IRole.Player2;
          break;
      }
      return data;
    });

    const player1Moved = squares.filter((item: any) => item === IRole.Player1).length;
    const player2Moved = squares.filter((item: any) => item === IRole.Player2).length;

    console.log('LOGGER---- GAME STATE: ', squares);

    return {
      squares,
      newTurn: player1Moved > player2Moved ? 'o' : 'x',
    };
  };

  return {
    onGetGameState,
  };
};

export default useGetGameState;

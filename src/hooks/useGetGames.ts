import useContractSigner from './useContractSigner';
import sleep from '@/utils/sleep';
import { ZeroAddress } from 'ethers';
import { COUNTER_TIME, SLEEP_TIME } from '@/configs';
import { IGameMapper, Player, WinnerState } from '@/interfaces/useGetGames';

const useGetGames = () => {
  const contractSigner = useContractSigner();

  const gamesBuilder = (games: any): IGameMapper => {
    return {
      player1: games[0],
      player2: games[1],
      winner: games[2].toString(),
      turn: games[3].toString(),
    };
  };

  const onWaitingGames = async (gameID: string): Promise<IGameMapper | undefined> => {
    let games = undefined;
    let counter = 0;
    if (!contractSigner) return undefined;
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const _games = await contractSigner.games(gameID);
        const mapper = gamesBuilder(_games);
        if (counter === COUNTER_TIME) {
          throw new Error(`Timeout.`);
        }

        counter++;
        if (mapper.player1 === ZeroAddress || mapper.player2 === ZeroAddress) {
          await sleep(SLEEP_TIME);
          continue;
        }
        games = mapper;
        break;
      }
    } catch (error) {
      console.log('LOGGER--- GET GAMES ERROR: ', error);
    }
    return games;
  };

  const onWaitingUpdateNextMove = async ({
    gameID,
    roleNumber,
  }: {
    gameID: string;
    roleNumber: Player;
  }): Promise<IGameMapper | undefined> => {
    let counter = 0;
    let games = undefined;
    if (!contractSigner) return undefined;
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const _games = await contractSigner.games(gameID);
        const mapper = gamesBuilder(_games);
        if (counter === COUNTER_TIME) {
          throw new Error('Timeout.');
        }

        counter++;
        if (mapper.turn === roleNumber && mapper.winner === WinnerState.Playing) {
          await sleep(SLEEP_TIME);
          continue;
        }

        games = mapper;
        break;
      }
      return games;
    } catch (error) {
      console.log('LOGGER--- GET GAMES ERROR: ', error);
    }
  };

  const onGetWinner = async ({ gameID }: { gameID: string }) => {
    try {
      if (!contractSigner) return undefined;
      const _games = await contractSigner.games(gameID);
      const mapper = gamesBuilder(_games);
      return mapper.winner;
    } catch (error) {
      console.log('LOGGER--- GET GAMES ERROR: ', error);
    }
  };

  return {
    onWaitingGames,
    onWaitingUpdateNextMove,
    onGetWinner,
  };
};

export default useGetGames;

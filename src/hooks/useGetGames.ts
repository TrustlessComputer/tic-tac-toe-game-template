import useContractSigner from './useContractSigner';
import sleep from '@/utils/sleep';
import { ZeroAddress } from 'ethers';
import { COUNTER_TIME, SLEEP_TIME } from '@/configs';
import { IGameMapper, Player, WinnerState } from '@/interfaces/useGetGames';
import SDKError, { ERROR_CODE } from '@/utils/error';

const useGetGames = () => {
  const contractSigner = useContractSigner();

  const gamesBuilder = (games: any): IGameMapper => {
    // address player1; 1
    // address player2; 2
    // uint256 turnTimePivot; 3
    // uint256 player1TimePool; 4
    // uint256 player2TimePool; 5
    // bool turn; 6
    // /*
    //     1 - Player 1
    //     0 - Player 2
    // */
    // DrawOfferState drawOffer; 7
    // MatchResult result; 8
    const turn = games[6].toString() === '1' ? '1' : '0';
    return {
      player1: games[0],
      player2: games[1],
      winner: games[7].toString(),
      turn: turn as any,
    };
  };

  const onWaitingGames = async (gameID: string): Promise<IGameMapper | undefined> => {
    let games = undefined;
    let counter = 0;
    if (!contractSigner) return undefined;
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const _games = await contractSigner.matches(gameID);
        const mapper = gamesBuilder(_games);
        if (counter === COUNTER_TIME) {
          throw new Error(`Timeout.`);
        }

        counter++;
        if (mapper.player1 !== ZeroAddress && mapper.player2 !== ZeroAddress && mapper.player1 === mapper.player2) {
          throw new SDKError(ERROR_CODE.JOIN_GAME_ERROR);
        }
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
    myRolePlayer,
  }: {
    gameID: string;
    myRolePlayer: Player;
  }): Promise<IGameMapper | undefined> => {
    let counter = 0;
    let games = undefined;
    if (!contractSigner) return undefined;
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const _games = await contractSigner.matches(gameID);
        const mapper = gamesBuilder(_games);
        if (counter === COUNTER_TIME) {
          throw new Error('Timeout.');
        }

        counter++;
        if (mapper.turn === myRolePlayer && mapper.winner === WinnerState.Playing) {
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
      const _games = await contractSigner.matches(gameID);
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

import useContractSigner from './useContractSigner';
import sleep from '@/utils/sleep';
import { COUNTER_TIME, SLEEP_TIME } from '@/configs';
import { IGameMapper, Player, WinnerState } from '@/interfaces/useGetGames';
import SDKError, { ERROR_CODE } from '@/utils/error';
import useGetGameState from '@/hooks/useGetGameState';
import { ethers } from 'ethers';

const useGetGames = () => {
  const contractSigner = useContractSigner();
  const { onGetGameState } = useGetGameState();

  const onGetGameMapper = async (gameID: string): Promise<IGameMapper | undefined> => {
    if (!contractSigner) return undefined;
    const { matchData } = await onGetGameState(gameID);
    return matchData;
  };

  const onWaitingGames = async (gameID: string): Promise<IGameMapper | undefined> => {
    let games = undefined;
    let counter = 0;
    if (!contractSigner) return undefined;
    const ZeroAddress: any = ethers.constants.AddressZero;
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const mapper = await onGetGameMapper(gameID);
        // console.log('Mapper', mapper);
        if (counter === COUNTER_TIME) {
          throw new Error(`Timeout.`);
        }

        counter++;
        if (mapper?.player1 !== ZeroAddress && mapper?.player2 !== ZeroAddress && mapper?.player1 === mapper?.player2) {
          throw new SDKError(ERROR_CODE.JOIN_GAME_ERROR);
        }
        if (mapper?.player1 === ZeroAddress || mapper?.player2 === ZeroAddress) {
          await sleep(SLEEP_TIME);
          continue;
        }
        games = mapper;
        break;
      }
    } catch (error) {
      console.log('LOGGER--- onWaitingGames ERROR: ', error);
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
        const mapper = await onGetGameMapper(gameID);
        console.log('aadd__', mapper);
        if (counter === COUNTER_TIME) {
          throw new Error('Timeout.');
        }

        counter++;
        if (mapper?.turn === myRolePlayer && mapper.winner === WinnerState.Playing) {
          await sleep(SLEEP_TIME);
          continue;
        }

        games = mapper;
        break;
      }
      return games;
    } catch (error) {
      console.log('LOGGER--- onWaitingUpdateNextMove ERROR: ', error);
    }
  };

  const onGetWinner = async ({ gameID }: { gameID: string }) => {
    try {
      if (!contractSigner) return undefined;
      const mapper = await onGetGameMapper(gameID);
      return mapper?.winner;
    } catch (error) {
      console.log('LOGGER--- onGetWinner ERROR: ', error);
    }
  };

  return {
    onWaitingGames,
    onWaitingUpdateNextMove,
    onGetWinner,
    onGetGameMapper,
  };
};

export default useGetGames;

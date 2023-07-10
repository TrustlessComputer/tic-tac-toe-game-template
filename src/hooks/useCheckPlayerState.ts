import useContractSigner from '@/hooks/useContractSigner';
import { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import { isArray } from 'lodash';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import useGetPlayingMatchID from '@/hooks/useGetPlayingMatchID';

export const INIT_PLAYER_STATE = {
  isFinding: false,
  isPlaying: false,
  isAvailable: false,
  playingMatchID: '',
  elo: '0',
};

export interface IGetPlayerState {
  isPlaying: boolean;
  isFinding: boolean;
  isAvailable: boolean;
  playingMatchID: string;
  elo: string;
}

const useCheckPlayerState = () => {
  const { keySet } = useContext(WalletContext);
  const contractSigner = useContractSigner();
  const { onGetMatchID } = useGetPlayingMatchID();

  const onCheckPlayer = async (): Promise<IGetPlayerState> => {
    if (!contractSigner || !keySet.address) {
      return { ...INIT_PLAYER_STATE };
    }
    try {
      const players = await contractSigner.players(keySet.address);
      if (isArray(players) && players.length > 1) {
        const state = players[1].toString();
        let playerState: IGetPlayerState = {
          isFinding: state === '1',
          isPlaying: state === '2',
          isAvailable: state === '0',
          playingMatchID: '',
          elo: players[0].toString(),
        };

        console.log('LOGGER---- playerState', playerState);

        if (playerState.isPlaying && keySet.address) {
          const matchID = await onGetMatchID();
          if (matchID) {
            playerState = { ...playerState, playingMatchID: matchID };
          }
        }

        return playerState;
      }
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    }

    return { ...INIT_PLAYER_STATE };
  };

  return {
    onCheckPlayer,
  };
};

export default useCheckPlayerState;

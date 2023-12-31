import useContractSigner from '@/hooks/useContractSigner';
import { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import { LoaderContext } from '@/contexts/loader.context';
// import { getErrorMessage } from '@/utils/error';
// import toast from 'react-hot-toast';
import sleep from '@/utils/sleep';
import useGetPlayingMatchID from '@/hooks/useGetPlayingMatchID';
import useGetGameState from '@/hooks/useGetGameState';

const useRequestEndMatch = () => {
  const contractSigner = useContractSigner();
  const { keySet } = useContext(WalletContext);
  const { setLoading } = useContext(LoaderContext);
  const { onGetMatchID } = useGetPlayingMatchID();

  const { onGetGameState } = useGetGameState();

  const onRequestEndMatch = async (isUpdateLoading = true) => {
    try {
      if (isUpdateLoading) {
        setLoading({ isLoading: true });
      }
      if (!contractSigner || !keySet.address) return;
      const matchID = await onGetMatchID();
      console.log('matchID __=>>', Number(matchID));
      if (matchID) {
        const gameState = await onGetGameState(matchID);
        // console.log('gameState__', gameState);
        if (!gameState?.isMatchEnd) {
          throw new Error('Please waiting to time end.');
        }
        console.log('runnnnn');
        const tx = await contractSigner.affirmTimeOut(matchID);
        console.log('Cancel match ____', tx);
        await tx.wait();
      }
    } catch (error) {
      // const { desc } = getErrorMessage(error);
      // toast.error(desc);
    } finally {
      await sleep(2000);
      setLoading({ isLoading: false });
    }
  };

  return {
    onRequestEndMatch,
  };
};

export default useRequestEndMatch;

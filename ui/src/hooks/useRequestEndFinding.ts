import useContractSigner from '@/hooks/useContractSigner';
import { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import { LoaderContext } from '@/contexts/loader.context';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import { PARENT_PATH, PARENT_PATH_V2 } from '@/configs';
import { GameContext } from '@/contexts/game.context';

const useRequestEndFinding = () => {
  const contractSigner = useContractSigner();
  const { keySet } = useContext(WalletContext);
  const { setLoading } = useContext(LoaderContext);
  const { roomInfo } = useContext(GameContext);
  const onRequestEndFinding = async () => {
    console.log('Start Cancel Find');
    try {
      setLoading({ isLoading: true });
      if (!contractSigner || !keySet.address) return;

      const tx = await contractSigner.cancelMatch();
      console.log('Cancel match ____', tx);

      window.top?.postMessage({ tokenRoom: roomInfo?.roomId, status: 'CLOSE' }, '*');
      await tx.wait();
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setLoading({ isLoading: false });
    }
  };

  return {
    onRequestEndFinding,
  };
};

export default useRequestEndFinding;

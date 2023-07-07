import useContractSigner from '@/hooks/useContractSigner';
import { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import { isArray } from 'lodash';
import { LoaderContext } from '@/contexts/loader.context';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';

const useRequestEndMatch = () => {
  const contractSigner = useContractSigner();
  const { keySet } = useContext(WalletContext);
  const { setLoading } = useContext(LoaderContext);
  const onRequestEndMatch = async () => {
    try {
      setLoading({ isLoading: true });
      if (!contractSigner || !keySet.address) return;
      const match = await contractSigner.getMatchesOfPlayer(keySet.address);
      if (isArray(match)) {
        const matchID = match[match.length - 1].toString();
        // await sleep(20);
        const tx = await contractSigner.getMatchesOfPlayer(matchID);
        await tx.wait();
      }
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setLoading({ isLoading: false });
    }
  };

  return {
    onRequestEndMatch,
  };
};

export default useRequestEndMatch;

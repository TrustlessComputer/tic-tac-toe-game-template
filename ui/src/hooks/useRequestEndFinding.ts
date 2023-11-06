import useContractSigner from '@/hooks/useContractSigner';
import { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import { LoaderContext } from '@/contexts/loader.context';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';

const useRequestEndFinding = () => {
  const contractSigner = useContractSigner();
  const { keySet } = useContext(WalletContext);
  const { setLoading } = useContext(LoaderContext);
  const onRequestEndFinding = async () => {
    console.log('Start Cancel Find');
    try {
      setLoading({ isLoading: true });
      if (!contractSigner || !keySet.address) return;

      const tx = await contractSigner.cancelMatch();
      console.log('Cancel match ____', tx);
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

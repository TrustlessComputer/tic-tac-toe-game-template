import useContractSigner from '@/hooks/useContractSigner';
import { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';

const useGetPlayingMatchID = () => {
  const contractSigner = useContractSigner();
  const { keySet } = useContext(WalletContext);

  const onGetMatchID = async () => {
    if (!contractSigner || !keySet.address) return;
    const matchID = await contractSigner.getPlayingMatchOfPlayer(keySet.address);
    return matchID;
  };

  return {
    onGetMatchID,
  };
};

export default useGetPlayingMatchID;

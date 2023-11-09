import { useContext, useMemo } from 'react';
import useProvider from './useProvider';
import GameABI from '../abis/game.json';
import { CONTRACT_ADDRESS } from '@/configs';
import { WalletContext } from '@/contexts/wallet.context';
import { getContractSigner } from '@/utils/signer';

function useContractSigner() {
  const provider = useProvider();
  const { keySet } = useContext(WalletContext);

  console.log('CONTRACT_ADDRESS__', CONTRACT_ADDRESS);

  return useMemo(() => {
    try {
      if (!keySet.prvKey || !provider) return undefined;
      const contractSigner = getContractSigner({
        address: CONTRACT_ADDRESS,
        ABI: GameABI,
        provider: provider,
        privateKey: keySet.prvKey,
      });
      return contractSigner;
    } catch (error) {
      return undefined;
    }
  }, [provider, keySet.prvKey]);
}

export default useContractSigner;

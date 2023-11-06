import { useContext, useMemo } from 'react';
import useProvider from './useProvider';

import ERC20ABI from '../abis/erc-20.json';
import { CONTRACT_ERC_20 } from '@/configs';
import { WalletContext } from '@/contexts/wallet.context';
import { getContractSigner } from '@/utils/signer';

function useContractERC20() {
  const provider = useProvider();
  const { keySet } = useContext(WalletContext);

  return useMemo(() => {
    try {
      if (!keySet.prvKey || !provider) return undefined;
      const contractSigner = getContractSigner({
        address: CONTRACT_ERC_20,
        ABI: ERC20ABI,
        provider: provider,
        privateKey: keySet.prvKey,
      });
      return contractSigner;
    } catch (error) {
      return undefined;
    }
  }, [provider, keySet.prvKey]);
}

export default useContractERC20;

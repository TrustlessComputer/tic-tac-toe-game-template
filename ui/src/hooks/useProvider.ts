import { useMemo } from 'react';
import { ethers } from 'ethers';
import { TC_NETWORK } from '@/configs';

function useProvider() {
  return useMemo(() => {
    try {
      return new ethers.providers.JsonRpcProvider(TC_NETWORK.RPC);
    } catch (error) {
      return undefined;
    }
  }, []);
}

export default useProvider;

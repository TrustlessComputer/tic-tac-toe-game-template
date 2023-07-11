import { useContext, useMemo } from 'react';
import { Contract, ethers } from 'ethers';
import { getContract } from '@/utils/contract';
import { TC_NETWORK } from '@/configs';
import { WalletContext } from '@/contexts/wallet.context';

function useContract<T extends Contract = Contract>(
  contractAddress: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { address } = useContext(WalletContext);
  return useMemo(() => {
    if (!contractAddress || !ABI) return null;
    try {
      const customProvider = new ethers.JsonRpcProvider(TC_NETWORK.RPC);
      return getContract(contractAddress, ABI, customProvider);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [contractAddress, ABI, withSignerIfPossible, address]) as T;
}

export default useContract;

import { Contract, ZeroAddress, isAddress } from 'ethers';
import type { JsonRpcProvider } from 'ethers';

export function getContract(address: string, ABI: any, provider: JsonRpcProvider): Contract {
  if (!isAddress(address) || address === ZeroAddress) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, provider as any);
}

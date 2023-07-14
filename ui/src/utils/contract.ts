import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { isAddress } from '@ethersproject/address';
import { ethers } from 'ethers';

export function getContract(address: string, ABI: any, provider: JsonRpcProvider): Contract {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, provider as any);
}

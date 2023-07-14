import { isAddress } from '@ethersproject/address';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers, Wallet } from 'ethers';
import { Contract } from '@ethersproject/contracts';

const getWalletSigner = ({ privateKey, provider }: { privateKey: string; provider: JsonRpcProvider }) => {
  const wallet = new Wallet(privateKey);
  return wallet.connect(provider);
};

const getContractSigner = ({
  address,
  ABI,
  provider,
  privateKey,
}: {
  address: string;
  ABI: any;
  provider: JsonRpcProvider;
  privateKey: string;
}) => {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  const walletSigner = getWalletSigner({ privateKey, provider });
  return new Contract(address, ABI, walletSigner);
};

export { getWalletSigner, getContractSigner };

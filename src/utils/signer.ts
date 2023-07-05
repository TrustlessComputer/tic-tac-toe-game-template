import { isAddress, Wallet, ZeroAddress, Contract, JsonRpcProvider } from 'ethers';

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
  if (!isAddress(address) || address === ZeroAddress) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  const walletSigner = getWalletSigner({ privateKey, provider });
  return new Contract(address, ABI, walletSigner);
};

export { getWalletSigner, getContractSigner };

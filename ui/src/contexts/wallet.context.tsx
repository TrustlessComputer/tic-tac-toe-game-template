import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import accountStorage from '@/lib/account/account.storage';
import { ethers, Wallet } from 'ethers';
import CryptoJS from 'crypto-js';
import SDKError, { ERROR_CODE, getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import { IKeySet, IWalletContext } from '@/interfaces/wallet.context';
import { useSearchParams } from 'react-router-dom';
import { isValidPrvKey } from '@/utils/validate';
import { PARENT_PATH } from '@/configs';

const INIT_KEY_SET = {
  prvKey: undefined,
  address: undefined,
  password: undefined,
  isNeedCreate: false,
};

const walletValue: IWalletContext = {
  keySet: { ...INIT_KEY_SET },
  address: undefined,
  onLogin: () => undefined,
  onRandomAccount: () => undefined,
  walletState: {
    isLogged: false,
    isNeedCreate: false,
    isNeedLogin: false,
  },
};

export const WalletContext = React.createContext<IWalletContext>(walletValue);

const DEFAULT_KEY_STORAGE = ['ACCOUNT_CIPHER_TEXT', 'ADDRESS_STORAGE', 'NUMBER_STORAGE_L2'];

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const [keySet, setKeySet] = React.useState<IKeySet>({ ...INIT_KEY_SET });
  const [address, setAddress] = React.useState<string | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const secretKey = searchParams.get('secretKey');

  console.log({ keySet });

  const walletState = React.useMemo(() => {
    const isLogged = keySet.prvKey && keySet.address;
    console.log({ isLogged });
    const isNeedCreate = !isLogged && keySet.isNeedCreate;
    const isNeedLogin = !isLogged && !isNeedCreate;
    return {
      isLogged: !!isLogged,
      isNeedCreate,
      isNeedLogin,
    };
  }, [keySet]);

  const onLogin = (password: string) => {
    try {
      const prvKey = accountStorage.getAccount(password);
      const wallet = new Wallet(prvKey);
      const address = wallet.address;
      accountStorage.setAddress({ address });
      setAddress(address);
      setKeySet({
        prvKey,
        address: wallet.address,
        password,
        isNeedCreate: false,
      });
      accountStorage.setPassWord({ password: password });
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    }
  };

  const onRandomAccount = (password: string) => {
    try {
      const id = CryptoJS.lib.WordArray.random(32);
      const prvKey = '0x' + id;
      const address = new ethers.Wallet(prvKey).address;
      if (!address) {
        throw new SDKError(ERROR_CODE.DECRYPT);
      }
      accountStorage.setAccount({
        prvKey: prvKey,
        password,
      });
      accountStorage.setPassWord({ password: password + '' });
      onLogin(password);
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    }
  };

  const onLoginSecretKeyParams = (secretKey: string) => {
    try {
      const wallet = new Wallet(secretKey);
      const address = wallet.address;
      setAddress(address);
      setKeySet({
        prvKey: secretKey,
        address: wallet.address,
        password: '',
        isNeedCreate: false,
      });
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    }
  };

  useEffect(() => {
    window.addEventListener('message', function (event) {
      console.log('event wallet__', event);
      if (event.origin === PARENT_PATH) {
        const data = event.data;

        if (typeof data === 'object') {
          for (let key in data?.auth) {
            if (DEFAULT_KEY_STORAGE.includes(key)) {
              localStorage.setItem(key, data.auth[key]);
            }
          }
          onPreload();
        }
      }
    });
  }, []);

  const onPreload = () => {
    if (secretKey && isValidPrvKey(secretKey)) {
      return onLoginSecretKeyParams(secretKey);
    }

    const cipherText = accountStorage.getAccountCipher();
    const address = accountStorage.getAddress();
    const pass = accountStorage.getPassWord();

    if (address) {
      setAddress(address);
    }
    setKeySet(value => ({ ...value, isNeedCreate: !cipherText }));

    if (pass && cipherText) {
      onLogin(pass.toString());
    }
  };

  React.useEffect(onPreload, []);

  const contextValues = useMemo((): IWalletContext => {
    return {
      keySet,
      onLogin,
      onRandomAccount,
      walletState,
      address,
    };
  }, [keySet, walletState, onLogin, onRandomAccount, address]);

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>;
};

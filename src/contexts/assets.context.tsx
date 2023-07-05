import React, { PropsWithChildren, useContext } from 'react';
import { WalletContext } from './wallet.context';
import useProvider from '../hooks/useProvider';
import debounce from 'lodash/debounce';
import BigNumber from 'bignumber.js';
import { MIN_AMOUNT } from '@/configs';

const INITIAL_BALANCE = {
  isLoaded: false,
  amount: '0',
};

const initialValue = {
  balance: {
    ...INITIAL_BALANCE,
  },
  isNeedTopupTC: false,
};

export const AssetsContext = React.createContext(initialValue);

export const AssetsProvider = ({ children }: PropsWithChildren) => {
  const { keySet } = useContext(WalletContext);
  const provider = useProvider();

  const [balance, setBalance] = React.useState({
    ...INITIAL_BALANCE,
  });

  const onLoadBalance = async () => {
    if (!provider || !keySet.address) return;
    try {
      const balance = await provider.getBalance(keySet.address);
      setBalance({
        amount: balance.toString(),
        isLoaded: true,
      });
    } catch (e) {
      setBalance({
        amount: '0',
        isLoaded: true,
      });
    }
  };

  const debounceLoadBalance = React.useCallback(debounce(onLoadBalance, 1000), [keySet.address]);

  const isNeedTopupTC = React.useMemo(() => {
    return balance.isLoaded && new BigNumber(balance.amount).lt(MIN_AMOUNT);
  }, [balance]);

  const contextValues = React.useMemo(() => {
    return {
      balance,
      isNeedTopupTC,
    };
  }, [balance, isNeedTopupTC]);

  React.useEffect(() => {
    debounceLoadBalance();
    const interval = setInterval(() => {
      debounceLoadBalance();
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [keySet.address]);

  return <AssetsContext.Provider value={contextValues}>{children}</AssetsContext.Provider>;
};
